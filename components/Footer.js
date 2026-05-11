import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p className="footer-copy">© 2026 GUMJUJU. All rights reserved.</p>
      <Link href="/#hero" className="footer-logo">GUMJUJU</Link>
      <Link href="/#hero" className="footer-back-top">Back to top ↑</Link>
    </footer>
  )
}
