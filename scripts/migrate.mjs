// One-time migration: uploads photos from public/images/<category>/ to Vercel Blob
// and inserts metadata rows into Supabase.
//
// Run with: node scripts/migrate.mjs

import { put } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CATEGORIES = ['cars', 'events', 'stages', 'landscape', 'portrait']

async function migrate() {
  for (const category of CATEGORIES) {
    const dir = path.join(process.cwd(), 'public', 'images', category)
    if (!fs.existsSync(dir)) {
      console.log(`Skipping ${category} — folder not found`)
      continue
    }

    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    console.log(`\n${category}: ${files.length} photos`)

    for (const filename of files) {
      const filepath = path.join(dir, filename)
      const buffer   = fs.readFileSync(filepath)
      const ext      = filename.split('.').pop().toLowerCase()
      const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

      const blob = await put(`photos/${category}/${filename}`, buffer, {
        access: 'public',
        contentType: mimeType,
      })

      const { error } = await supabase.from('photos').insert({
        src:           blob.url,
        blob_pathname: blob.pathname,
        category,
        title:         filename.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
        loc:           '',
        display_order: 0,
        featured:      false,
      })

      if (error) console.error(`  ✗ ${filename}:`, error.message)
      else       console.log(`  ✓ ${filename} → ${blob.url}`)
    }
  }

  console.log('\nMigration complete.')
}

migrate().catch(console.error)
