'use client'

import { useState, useEffect, useRef } from 'react'

const photos = [
  // CARS
  { src: '/images/cars/_GUM0605.jpg', category: 'cars', title: 'Car Meet', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/_GUM0610.jpg', category: 'cars', title: 'Car Meet', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/_GUM0615.jpg', category: 'cars', title: 'Car Meet', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_7065.jpg', category: 'cars', title: 'Super GT', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_7072.jpg', category: 'cars', title: 'Super GT', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_7264.jpg', category: 'cars', title: 'Super GT', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_7572.jpg', category: 'cars', title: 'Super GT', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_7677.jpg', category: 'cars', title: 'Super GT', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_8437.jpg', category: 'cars', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_8495.jpg', category: 'cars', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_8496.jpg', category: 'cars', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  { src: '/images/cars/GUM_8499.jpg', category: 'cars', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Cars & Motorsport · 2025' },
  // EVENTS
  { src: '/images/events/_GUM1027.jpg', category: 'events', title: 'Comic Fiesta 2025', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/_GUM1119.jpg', category: 'events', title: 'Comic Fiesta 2025', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_0931-Enhanced-NR-2.jpg', category: 'events', title: 'Christmas Nijigen', loc: 'Malaysia, 2024', cat: 'Events & Cosplay · 2024' },
  { src: '/images/events/GUM_1066-Enhanced-NR.jpg', category: 'events', title: 'Comic Fiesta 2024', loc: 'Malaysia, 2024', cat: 'Events & Cosplay · 2024' },
  { src: '/images/events/GUM_5770.jpg', category: 'events', title: 'Anime Fiesta+ 2025', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_5894.jpg', category: 'events', title: 'Anime Fiesta+ 2025', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_6599-Enhanced-NR.jpg', category: 'events', title: 'Fantasy Isekai', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_8315-2.jpg', category: 'events', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_8536.jpg', category: 'events', title: 'Tokyo Auto Saloon', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  { src: '/images/events/GUM_8844.jpg', category: 'events', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Events & Cosplay · 2025' },
  // STAGES
  { src: '/images/stages/_GUM0179.jpg', category: 'stages', title: 'Anipop: Happy Sky', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/_GUM0230.jpg', category: 'stages', title: 'Anipop: Happy Sky', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/_GUM0374.jpg', category: 'stages', title: 'Anniverse', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9005-Enhanced-NR.jpg', category: 'stages', title: 'Animania 2024', loc: 'Malaysia, 2024', cat: 'Stages · 2024' },
  { src: '/images/stages/GUM_9045-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9106-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9138-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9280-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9291-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  { src: '/images/stages/GUM_9420-Enhanced-NR.jpg', category: 'stages', title: 'Cosmic 2025', loc: 'Malaysia, 2025', cat: 'Stages · 2025' },
  // LANDSCAPE
  { src: '/images/landscape/GUM_2012-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape I', loc: 'Malaysia, 2025', cat: 'Landscape · 2025' },
  { src: '/images/landscape/GUM_2132-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape II', loc: 'Malaysia, 2025', cat: 'Landscape · 2025' },
  { src: '/images/landscape/GUM_2141-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape III', loc: 'Malaysia, 2025', cat: 'Landscape · 2025' },
  { src: '/images/landscape/GUM_2176-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape IV', loc: 'Malaysia, 2025', cat: 'Landscape · 2025' },
  { src: '/images/landscape/GUM_2248.jpg', category: 'landscape', title: 'Landscape V', loc: 'Malaysia, 2025', cat: 'Landscape · 2025' },
  { src: '/images/landscape/GUM_2385-2.jpg', category: 'landscape', title: 'Landscape VI', loc: 'Indonesia, 2026', cat: 'Landscape · 2026' },
  { src: '/images/landscape/GUM_5143-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape VII', loc: 'Indonesia, 2026', cat: 'Landscape · 2026' },
  { src: '/images/landscape/GUM_5225-Enhanced-NR.jpg', category: 'landscape', title: 'Landscape VIII', loc: 'Indonesia, 2026', cat: 'Landscape · 2026' },
  { src: '/images/landscape/GUM_5940.jpg', category: 'landscape', title: 'Landscape IX', loc: 'Malaysia, 2024', cat: 'Landscape · 2024' },
  { src: '/images/landscape/GUM_8941.jpg', category: 'landscape', title: 'Landscape X', loc: 'Malaysia, 2024', cat: 'Landscape · 2024' },
  // PORTRAIT
  { src: '/images/portrait/GUM_5872.jpg', category: 'portrait', title: 'Anime Fiesta+ 2025', loc: 'Malaysia, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_5957.jpg', category: 'portrait', title: 'Science Exhibition', loc: 'Malaysia, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_5992.jpg', category: 'portrait', title: 'Science Exhibition', loc: 'Malaysia, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_6954.jpg', category: 'portrait', title: 'Connichiwa 2025', loc: 'Kuala Lumpur, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_7005.jpg', category: 'portrait', title: 'Ilham Gallery', loc: 'Kuala Lumpur, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_8378-2.jpg', category: 'portrait', title: 'Comifuro 19', loc: 'Indonesia, 2024', cat: 'Portrait · 2024' },
  { src: '/images/portrait/GUM_8745-Enhanced-NR-2.jpg', category: 'portrait', title: 'YL Fair', loc: 'Malaysia, 2025', cat: 'Portrait · 2025' },
  { src: '/images/portrait/GUM_9361.jpg', category: 'portrait', title: 'Animania 2024', loc: 'Malaysia, 2024', cat: 'Portrait · 2024' },
]

const filters = ['all', 'cars', 'events', 'stages', 'landscape', 'portrait']
const filterLabels = { all: 'All', cars: 'Cars & Motorsport', events: 'Events & Cosplay', stages: 'Stages', landscape: 'Landscape', portrait: 'Portrait' }

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // { src, title, loc }
  const [scrolled, setScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [submitLabel, setSubmitLabel] = useState('Send Message →')
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const itemRefs = useRef([])

  // Scroll listener for nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for gallery fade-in
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    itemRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [activeFilter])

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const visiblePhotos = activeFilter === 'all' ? photos : photos.filter(p => p.category === activeFilter)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLabel('Sending…')
    setSubmitDisabled(true)
    try {
      const res = await fetch('https://formspree.io/f/xlgprdwg', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitLabel('Sent ✓')
        setFormStatus('Thanks! I\'ll get back to you soon.')
        e.target.reset()
        setTimeout(() => { setSubmitLabel('Send Message →'); setSubmitDisabled(false); setFormStatus('') }, 4000)
      } else throw new Error()
    } catch {
      setSubmitLabel('Send Message →')
      setSubmitDisabled(false)
      setFormStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      {/* NAV */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">GUMJUJU</a>
        <ul className="nav-links">
          <li><a href="#gallery">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Photography Portfolio</p>
          <h1 className="hero-title">
            Seeing<br />the <em>quiet</em><br />in things.
          </h1>
          <p className="hero-sub">
            Cars. Events. Stages. Landscape. Portrait. A visual practice chasing speed,
            culture, and the quiet moments in between.
          </p>
          <a href="#gallery" className="btn-primary">
            View Work <span className="btn-arrow">→</span>
          </a>
        </div>
        <div className="hero-image">
          <img src="/images/others/_GUM1113.jpg" alt="Hero photo"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)', pointerEvents: 'none' }} />
          <div className="hero-stat">
            <span className="hero-stat-num">02</span>
            <span className="hero-stat-label">Years Active</span>
          </div>
          <p className="hero-caption">Malaysia, 2024</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {['Cars & Motorsport', 'Events & Cosplay', 'Stages', 'Landscape', 'Portrait',
            'Cars & Motorsport', 'Events & Cosplay', 'Stages', 'Landscape', 'Portrait'].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* GALLERY */}
      <section id="gallery">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2 className="section-title">Selected Work</h2>
          <div className="section-line" />
        </div>
        <div className="filter-row">
          {filters.map(f => (
            <button key={f} className={`filter-btn${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {visiblePhotos.map((photo, i) => (
            <div
              key={photo.src}
              className="gallery-item"
              ref={el => itemRefs.current[i] = el}
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
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">About</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-img-wrap">
            <div className="about-portrait">
              <img src="/images/others/GUM_7003.jpg" alt="About"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="about-frame" />
          </div>
          <div className="about-content">
            <blockquote className="about-quote">
              &ldquo;Photography is the pause between what is seen and what is felt.&rdquo;
            </blockquote>
            <p className="about-body">
              Based in Kuala Lumpur, I shoot across what I see through the lens — motorsport,
              events &amp; cosplay, landscape, and portrait. Whether walking through a street
              or in the middle of a convention floor, I&apos;m drawn to the energy of a moment
              and the details that tell the full story.<br /><br />
              Gear doesn&apos;t define me — it&apos;s the drive to capture and share that keeps me behind the camera.
              DO what you LOVE, and keep it simple.
            </p>
            <div className="about-stats">
              {[['Nikon', 'Camera Brand'], ['5', 'Type'], ['30+', 'Events'], ['MY', 'Based']].map(([num, label]) => (
                <div className="stat-item" key={label}>
                  <span className="stat-number">{num}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-header">
          <span className="section-num">03</span>
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-line" />
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-intro">
              Just a newbie photographer trying to capture the world through my lens.
            </p>
            <div className="contact-detail">
              <div className="contact-line">
                <div className="contact-line-icon">✉</div>
                <span>baesty21@gmail.com</span>
              </div>
              <div className="contact-line">
                <div className="contact-line-icon">◎</div>
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="contact-line">
                <div className="contact-line-icon">IG</div>
                <a href="https://www.instagram.com/gumjuju___/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}>@gumjuju___</a>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New message from portfolio" />
            <input type="text" name="_gotcha" style={{ display: 'none' }} />
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-input" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" name="subject" className="form-input" placeholder="What's this about?" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-textarea" placeholder="Tell me about your project…" required />
            </div>
            <button type="submit" className="form-submit" disabled={submitDisabled}>
              {submitLabel}
            </button>
            {formStatus && (
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', marginTop: '8px',
                color: submitLabel === 'Sent ✓' ? '#7a8a60' : '#c0614a' }}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-copy">© 2026 GUMJUJU. All rights reserved.</p>
        <a href="#hero" className="footer-logo">GUMJUJU</a>
        <a href="#hero" className="footer-back-top">Back to top ↑</a>
      </footer>

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