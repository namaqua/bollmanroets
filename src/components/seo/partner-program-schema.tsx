import { Helmet } from 'react-helmet-async'

interface PartnerProgramSchemaProps {
  name?: string
  description?: string
  url?: string
  benefits?: string[]
}

export function PartnerProgramSchema({
  name = 'Bollman + Roets Partner Program',
  description = 'Strategic partnership program for consultants. Earn 30% commission on build projects and recurring revenue.',
  url = 'https://br.luluwaldhund.de/partner',
  benefits = [
    '30% commission on build projects',
    '30% recurring monthly revenue',
    'Full technical support',
    'No development team required',
  ],
}: PartnerProgramSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Bollman + Roets',
      url: 'https://br.luluwaldhund.de',
    },
    serviceType: 'Partner Program',
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Partner Benefits',
      itemListElement: benefits.map((benefit, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: benefit,
        },
        position: index + 1,
      })),
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
