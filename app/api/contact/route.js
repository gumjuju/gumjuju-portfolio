import { NextResponse } from 'next/server'

const FORM_ENDPOINT = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xlgprdwg'
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const MAX_CONTENT_LENGTH = 20_000

const requestWindow = new Map()

function cleanValue(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function isSameOrigin(request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

function isRateLimited(ip, now) {
  const previous = requestWindow.get(ip)

  if (!previous || now - previous.windowStart > WINDOW_MS) {
    requestWindow.set(ip, { count: 1, windowStart: now })
    return false
  }

  if (previous.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  previous.count += 1
  requestWindow.set(ip, previous)
  return false
}

export async function POST(request) {
  const requestId = crypto.randomUUID()
  const ip = getClientIp(request)
  const now = Date.now()

  if (!isSameOrigin(request)) {
    console.warn('[contact][forbidden-origin]', { requestId, ip })
    return NextResponse.json({ message: 'Forbidden.' }, { status: 403 })
  }

  if (isRateLimited(ip, now)) {
    console.warn('[contact][rate-limited]', { requestId, ip })
    return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_CONTENT_LENGTH) {
    console.warn('[contact][payload-too-large]', { requestId, ip, contentLength })
    return NextResponse.json({ message: 'Payload too large.' }, { status: 413 })
  }

  let form
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ message: 'Invalid form payload.' }, { status: 400 })
  }

  if (cleanValue(form.get('_gotcha'), 100)) {
    // Return success for bots to avoid teaching them how the trap works.
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const name = cleanValue(form.get('name'), 120)
  const email = cleanValue(form.get('email'), 254)
  const subject = cleanValue(form.get('subject'), 200)
  const message = cleanValue(form.get('message'), 4000)

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 })
  }

  const abortController = new AbortController()
  const timeout = setTimeout(() => abortController.abort(), 8000)

  try {
    const upstream = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _subject: 'New message from portfolio',
      }),
      signal: abortController.signal,
      cache: 'no-store',
    })

    if (!upstream.ok) {
      console.error('[contact][upstream-failure]', { requestId, ip, status: upstream.status })
      return NextResponse.json({ message: 'Unable to send message right now.' }, { status: 502 })
    }

    console.info('[contact][sent]', { requestId, ip, at: new Date(now).toISOString() })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('[contact][error]', {
      requestId,
      ip,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json({ message: 'Unable to send message right now.' }, { status: 502 })
  } finally {
    clearTimeout(timeout)
  }
}
