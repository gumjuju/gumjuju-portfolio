'use client'

import { useState, useEffect } from 'react'
import { getPhotosByCategory, getCategoryById } from '@/lib/data'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CategoryPage() {
  const { slug } = useParams()
  const router = useRouter()
  const category = getCategoryById(slug)
  const photos = getPhotosByCategory(slug)
  
  const [lightbox, setLightbox] = useState(null)

  // Close lightbox on Escape or browser back button
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (lightbox) {
      window.history.pushState({ lightbox: true }, '')
    }
    const onPop = () => { setLightbox(null) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [lightbox])

  if (!category) {
    return (
      <section className="category-not-found" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Category Not Found</h1>
        <button onClick={() => router.push('/#categories')} className="btn-primary">Return to Gallery</button>
      </section>
    )
  }

  return (
    <>
      <section id="category-gallery" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="section-header">
          <span className="section-num">Lib</span>
          <h1 className="section-title">{category.label}</h1>
          <div className="section-line" />
        </div>
        
        <div className="gallery-grid" style={{ marginTop: '3rem' }}>
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="gallery-item visible"
              onClick={() => setLightbox(photo)}
            >
              <div className="photo-placeholder">
                <img className="photo-inner" src={photo.src} alt={photo.title} loading="lazy" />
                <div className="photo-overlay">
                  <div className="photo-meta">
                    <span className="photo-meta-title">{photo.title}</span>
                    <span className="photo-meta-cat">{photo.cat}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {photos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: '2rem' }}>
            No photos found in this category yet.
          </p>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
          <Link href="/#categories" className="btn-primary">
            <span className="btn-arrow" style={{ marginRight: '0.5em', marginLeft: 0 }}>←</span> Back to Categories
          </Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null) }}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>Close ✕</button>
          <div className="lightbox-content">
            <img className="lightbox-img" src={lightbox.src} alt={lightbox.title} />
            <p className="lightbox-caption">{lightbox.title} — {lightbox.loc}</p>
          </div>
        </div>
      )}
    </>
  )
}
