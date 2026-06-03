import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const db = getServiceClient()
  let query = db
    .from('photos')
    .select('id, src, title, loc, category, display_order')
    .order('display_order')

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) {
    console.error('[photos][error]', error.message)
    return NextResponse.json({ error: 'Failed to load photos.' }, { status: 500 })
  }
  return NextResponse.json(data)
}
