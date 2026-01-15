import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon } from '@/components/ui/icons'
import { EntityBlock } from '@/components/ui/entity-block'
import { RevenueTable } from '@/components/ui/revenue-table'
import { CompetitorComparison } from '@/components/ui/competitor-matrix'
import { MoatDiagram } from '@/components/ui/moat-diagram'
import { MarketSizeChart } from '@/components/ui/market-size-chart'
import { TractionSummary } from '@/components/ui/traction-metrics'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema, InvestorRelationsSchema } from '@/components/seo'

const SITE_URL = 'https://br.luluwaldhund.de'

export function InvestorPage() {
  const { t, locale, getLocalizedPath } = useI18n()

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.investor.title, url: `${SITE_URL}${locale === 'de' ? '/investoren' : '/en/investors'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.investor.title}
        description={t.seo.investor.description}
      />
      <WebPageSchema
        title={t.seo.investor.title}
        description={t.seo.investor.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <InvestorRelationsSchema />

      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <Small className="text-brass-gold font-medium mb-4 block">
              {t.investor.title}
            </Small>
            <H1 className="mb-6">{t.investor.hero.headline}</H1>
            <Body className="text-lg text-muted-foreground mb-8">
              {t.investor.hero.subheadline}
            </Body>
            <Button asChild size="lg">
              <Link to={getLocalizedPath('/kontakt') + '?interest=investment'}>
                {t.investor.cta.button}
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Entity Block */}
          <EntityBlock
            data={t.investor.hero.entityBlock}
            variant="dark"
            layout="list"
          />
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Moat Section */}
      <Section>
        <H2 className="text-center mb-4">{t.investor.moat.headline}</H2>
        <Body className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t.investor.moat.compoundingEffect}
        </Body>

        <MoatDiagram
          layers={t.investor.moat.layers}
          compoundingEffect={t.investor.moat.compoundingEffect}
        />
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Financials Section */}
      <Section>
        <H2 className="text-center mb-12">{t.investor.financials.headline}</H2>

        <div className="grid gap-8 lg:grid-cols-2">
          <RevenueTable
            title={t.investor.financials.unitEconomics.title}
            columns={[
              { key: 'metric', label: locale === 'de' ? 'Kennzahl' : 'Metric', align: 'left' },
              { key: 'year1', label: locale === 'de' ? 'Jahr 1' : 'Year 1', align: 'right' },
              { key: 'year3', label: locale === 'de' ? 'Jahr 3' : 'Year 3', align: 'right' },
              { key: 'change', label: locale === 'de' ? 'Änderung' : 'Change', align: 'right', highlight: true },
            ]}
            rows={t.investor.financials.unitEconomics.rows}
          />

          <RevenueTable
            title={t.investor.financials.patternGrowth.title}
            columns={[
              { key: 'year', label: locale === 'de' ? 'Jahr' : 'Year', align: 'left' },
              { key: 'patterns', label: 'Patterns', align: 'right' },
              { key: 'margin', label: locale === 'de' ? 'Marge' : 'Margin', align: 'right', highlight: true },
            ]}
            rows={t.investor.financials.patternGrowth.rows}
          />
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Market Section */}
      <Section className="bg-accent/30">
        <H2 className="text-center mb-12">{t.investor.market.headline}</H2>

        {/* TAM/SAM/SOM */}
        <MarketSizeChart
          tam={t.investor.market.tam}
          sam={t.investor.market.sam}
          som={t.investor.market.som}
          variant="cards"
          className="mb-12"
        />

        {/* Penetration Table */}
        <div className="max-w-md mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    {locale === 'de' ? 'Jahr' : 'Year'}
                  </th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                    {locale === 'de' ? 'Kunden' : 'Clients'}
                  </th>
                  <th className="text-right p-3 text-sm font-medium text-brass-gold">
                    {locale === 'de' ? 'Umsatz' : 'Revenue'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.investor.market.penetration.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-3 text-sm font-medium">{row.year}</td>
                    <td className="p-3 text-sm text-right text-muted-foreground">{row.clients}</td>
                    <td className="p-3 text-sm text-right font-medium text-brass-gold">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Competitive Section */}
      <Section>
        <H2 className="text-center mb-12">
          {locale === 'de' ? 'Wettbewerbsvergleich' : 'Competitive Comparison'}
        </H2>

        <CompetitorComparison
          comparisons={[
            {
              title: t.investor.competitive.vsSaas.title,
              dimensions: t.investor.competitive.vsSaas.dimensions,
              competitorLabel: locale === 'de' ? 'Wettbewerb' : 'Competitor',
            },
            {
              title: t.investor.competitive.vsDev.title,
              dimensions: t.investor.competitive.vsDev.dimensions,
              competitorLabel: locale === 'de' ? 'Wettbewerb' : 'Competitor',
            },
          ]}
          usLabel="B&R"
        />
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Traction Section */}
      <Section>
        <H2 className="text-center mb-12">{t.investor.traction.headline}</H2>

        <TractionSummary
          status={t.investor.traction.status}
          pipeline={t.investor.traction.pipeline}
          partnerInterest={t.investor.traction.partnerInterest}
          team={t.investor.traction.team}
          runway={t.investor.traction.runway}
          labels={{
            partnerInterest: locale === 'de' ? 'Partner-Interesse' : 'Partner Interest',
          }}
          className="max-w-4xl mx-auto"
        />
      </Section>

      {/* CTA Section */}
      <Section className="bg-midnight-navy text-white">
        <div className="max-w-2xl mx-auto text-center">
          <H2 className="mb-8">{t.investor.cta.headline}</H2>
          <Button asChild size="lg" variant="secondary">
            <Link to={getLocalizedPath('/kontakt') + '?interest=investment'}>
              {t.investor.cta.button}
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
