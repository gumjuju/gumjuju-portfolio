'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categories } from '@/lib/data'

export default function Home() {
  const [formStatus, setFormStatus] = useState('')
  const [submitLabel, setSubmitLabel] = useState('Send Message →')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLabel('Sending…')
    setSubmitDisabled(true)
    try {
      const res = await fetch('/api/contact', {
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
          <Link href="/#categories" className="btn-primary">
            View Work <span className="btn-arrow">→</span>
          </Link>
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

      {/* CATEGORIES */}
      <section id="categories">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2 className="section-title">Selected Work</h2>
          <div className="section-line" />
        </div>
        
        <div className="category-cards-grid">
          {categories.map((cat) => (
            <Link href={`/category/${cat.id}`} key={cat.id} className="category-card">
              <div className="category-card-img">
                <img src={cat.image} alt={cat.label} />
                <div className="category-card-overlay">
                  <h3 className="category-card-title">{cat.label}</h3>
                  <span className="category-card-link">Explore Library →</span>
                </div>
              </div>
            </Link>
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
    </>
  )
}