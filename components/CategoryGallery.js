'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CategoryGallery({ photos }) {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (lightbox) window.history.pushState({ lightbox: true }, '')
    const onPop = () => setLightbox(null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [lightbox])

  if (!photos.length) {
    return <p style={{ color: 'var(--muted)', fontFamily: 'var(--sans)' }}>No photos yet.</p>
  }

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="gallery-item visible"
            onClick={() => setLightbox(photo)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={photo.src}
              alt={photo.title || photo.category}
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              priority={index === 0}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <div className="photo-overlay" style={{ pointerEvents: 'none', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.1rem',
                fontWeight: 400,
                color: '#ffffff',
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                letterSpacing: '0.03em',
              }}>
                {photo.title}
              </span>
              {photo.loc && (
                <span style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}>
                  {photo.loc}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="lightbox open"
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null) }}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            Close ✕
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.title || lightbox.category}
            width={1600}
            height={1067}
            style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', objectFit: 'contain' }}
            priority
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem 3rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.35rem',
          }}>
            <p style={{
              margin: 0,
              fontFamily: 'var(--serif)',
              fontSize: '2rem',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '0.05em',
              textAlign: 'center',
              textShadow: '0 1px 10px rgba(0,0,0,0.6)',
            }}>
              {lightbox.title}
            </p>
            {lightbox.loc && (
              <p style={{
                margin: 0,
                fontFamily: 'var(--sans)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--accent)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                {lightbox.loc}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
