import { Cormorant_Garamond, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'GUMJUJU — Photography Portfolio',
  description: 'Cars. Events. Stages. Landscape. Portrait. A visual practice chasing speed, culture, and the quiet moments in between.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body suppressHydrationWarning={true}>{children}<Analytics /></body>
    </html>
  )
}