'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) ? setCategories(data) : null)
      .catch(() => {})
  }, [])

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <Link href="/#hero" className="nav-logo">GUMJUJU</Link>
      <ul className="nav-links">
        <li className="dropdown">
          <Link href="/#gallery">Categories ▾</Link>
          <ul className="dropdown-menu">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.id}`}>{cat.label}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  )
}
