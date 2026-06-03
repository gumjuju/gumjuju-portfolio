import { supabase } from '@/lib/supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, cover_src, display_order')
    .order('display_order')
  if (error) throw new Error(`getCategories: ${error.message}`)
  return data
}

export async function getCategoryById(id) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, cover_src')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getPhotosByCategory(category) {
  const { data, error } = await supabase
    .from('photos')
    .select('id, src, title, loc, category')
    .eq('category', category)
    .order('display_order')
  if (error) throw new Error(`getPhotosByCategory: ${error.message}`)
  return data
}

export async function getAllPhotos() {
  const { data, error } = await supabase
    .from('photos')
    .select('id, src, title, loc, category, display_order, featured, created_at')
    .order('category')
    .order('display_order')
  if (error) throw new Error(`getAllPhotos: ${error.message}`)
  return data
}

export async function getFeaturedPhotos(limit = 6) {
  const { data, error } = await supabase
    .from('photos')
    .select('id, src, title, loc, category')
    .eq('featured', true)
    .order('display_order')
    .limit(limit)
  if (error) throw new Error(`getFeaturedPhotos: ${error.message}`)
  return data
}
