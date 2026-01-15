import { Helmet } from 'react-helmet-async'

interface InvestorRelationsSchemaProps {
  companyName?: string
  description?: string
  url?: string
  foundingDate?: string
  numberOfEmployees?: string
  industry?: string
}

export function InvestorRelationsSchema({
  companyName = 'Bollman + Roets',
  description = 'AI-Native Software Manufacturing for German SMEs. Enterprise software in 2-4 weeks with 60-85% gross margins.',
  url = 'https://br.luluwaldhund.de/investoren',
  foundingDate = '2024',
  numberOfEmployees = '1-10',
  industry = 'Software Development',
}: InvestorRelationsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    description,
    url: 'https://br.luluwaldhund.de',
    foundingDate,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: numberOfEmployees,
    },
    industry,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Investor Relations',
      url,
      availableLanguage: ['German', 'English'],
    },
    knowsAbout: [
      'Custom Software Development',
      'AI-Assisted Development',
      'German Mittelstand',
      'CRM Systems',
      'CPQ Systems',
      'HR Management Software',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
