import { getClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  await getClient().from('categories').select('id').limit(1)
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
}
