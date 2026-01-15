import { Helmet } from 'react-helmet-async'
import { useI18n } from '@/client/lib/i18n'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://br.luluwaldhund.de'

interface BreadcrumbItem {
  name: string
  url: string
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bollman + Roets',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: 'Maßgeschneiderte Software-Lösungen für den deutschen Mittelstand. CRM, CPQ, HR-Systeme in 6-12 Wochen.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 1',
      addressLocality: 'Berlin',
      postalCode: '12345',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-123-456-789',
      contactType: 'sales',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Bollman + Roets',
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: '+49-123-456-789',
    email: 'kontakt@bollman-roets.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 1',
      addressLocality: 'Berlin',
      postalCode: '12345',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.52,
      longitude: 13.405,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: [
      'Custom Software Development',
      'CRM Development',
      'CPQ Systems',
      'HR Management Software',
      'Business Process Automation',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function WebPageSchema({
  title,
  description
}: {
  title: string
  description: string
}) {
  const location = useLocation()
  const { locale } = useI18n()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${SITE_URL}${location.pathname}`,
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bollman + Roets',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bollman + Roets',
      url: SITE_URL,
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function ServiceSchema({
  name,
  description,
  timeRequired
}: {
  name: string
  description: string
  timeRequired?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Bollman + Roets',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    ...(timeRequired && { timeRequired }),
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
