import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/data'

export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json(categories)
  } catch (e) {
    console.error('[categories][error]', e.message)
    return NextResponse.json({ error: 'Failed to load categories.' }, { status: 500 })
  }
}
