import { notFound } from 'next/navigation'
import { getCategoryById, getPhotosByCategory } from '@/lib/data'
import CategoryGallery from '@/components/CategoryGallery'
import Link from 'next/link'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = await getCategoryById(slug)
  if (!category) return { title: 'Not Found — GUMJUJU' }
  return { title: `${category.label} — GUMJUJU` }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const [category, photos] = await Promise.all([
    getCategoryById(slug),
    getPhotosByCategory(slug),
  ])

  if (!category) notFound()

  return (
    <section id="category-gallery" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 2rem' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 300, marginBottom: '2rem' }}>
          {category.label}
        </h1>
        <CategoryGallery photos={photos} />
        <Link href="/#categories" className="btn-primary" style={{ marginTop: '3rem', display: 'inline-block' }}>
          ← Back to Categories
        </Link>
      </div>
    </section>
  )
}
