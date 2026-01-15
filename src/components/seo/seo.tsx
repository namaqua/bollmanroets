import { Helmet } from 'react-helmet-async'
import { useI18n } from '@/client/lib/i18n'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const SITE_URL = 'https://br.luluwaldhund.de'
const DEFAULT_IMAGE = '/og-image.jpg'

export function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false
}: SEOProps) {
  const { locale, t } = useI18n()
  const location = useLocation()

  const pageTitle = title
    ? `${title} | Bollman + Roets`
    : 'Bollman + Roets | Maßgeschneiderte Software für den Mittelstand'

  const pageDescription = description || t.seo.defaultDescription
  const canonicalUrl = `${SITE_URL}${location.pathname}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  // Generate alternate language URLs
  const getAlternateUrl = (lang: 'de' | 'en') => {
    const path = location.pathname
    if (lang === 'de') {
      // German - remove /en prefix if present
      if (path.startsWith('/en')) {
        const dePath = path.replace('/en', '') || '/'
        // Map English paths to German paths
        const pathMap: Record<string, string> = {
          '/about': '/uber-uns',
          '/solutions': '/losungen',
          '/contact': '/kontakt',
        }
        return `${SITE_URL}${pathMap[dePath] || dePath}`
      }
      return canonicalUrl
    } else {
      // English - add /en prefix
      if (path.startsWith('/en')) {
        return canonicalUrl
      }
      // Map German paths to English paths
      const pathMap: Record<string, string> = {
        '/uber-uns': '/en/about',
        '/losungen': '/en/solutions',
        '/kontakt': '/en/contact',
        '/': '/en',
      }
      return `${SITE_URL}${pathMap[path] || `/en${path}`}`
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={locale} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="de" href={getAlternateUrl('de')} />
      <link rel="alternate" hrefLang="en" href={getAlternateUrl('en')} />
      <link rel="alternate" hrefLang="x-default" href={getAlternateUrl('de')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'de' ? 'en_US' : 'de_DE'} />
      <meta property="og:site_name" content="Bollman + Roets" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
