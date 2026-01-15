import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, H3, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon } from '@/components/ui/icons'
import { EntityBlock } from '@/components/ui/entity-block'
import { RevenueTable } from '@/components/ui/revenue-table'
import { MetricHighlight } from '@/components/ui/metric-highlight'
import { CaseStudyGrid } from '@/components/ui/case-study-card'
import { CriteriaChecklist } from '@/components/ui/criteria-checklist'
import { ProcessSteps } from '@/components/ui/process-steps'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema, PartnerProgramSchema } from '@/components/seo'

const SITE_URL = 'https://br.luluwaldhund.de'

export function PartnerPage() {
  const { t, locale, getLocalizedPath } = useI18n()

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.partner.title, url: `${SITE_URL}${locale === 'de' ? '/partner' : '/en/partners'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.partner.title}
        description={t.seo.partner.description}
      />
      <WebPageSchema
        title={t.seo.partner.title}
        description={t.seo.partner.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <PartnerProgramSchema
        name={locale === 'de' ? 'Bollman + Roets Partner-Programm' : 'Bollman + Roets Partner Program'}
        description={t.seo.partner.description}
        url={`${SITE_URL}${locale === 'de' ? '/partner' : '/en/partners'}`}
      />

      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <Small className="text-brass-gold font-medium mb-4 block">
              {t.partner.title}
            </Small>
            <H1 className="mb-6">{t.partner.hero.headline}</H1>
            <Body className="text-lg text-muted-foreground mb-8">
              {t.partner.hero.subheadline}
            </Body>
            <Button asChild size="lg">
              <Link to={getLocalizedPath('/kontakt') + '?interest=partnership'}>
                {t.partner.cta.button}
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Entity Block */}
          <EntityBlock
            data={{
              [locale === 'de' ? 'Rolle' : 'Role']: t.partner.hero.entityBlock.role,
              [locale === 'de' ? 'Provision' : 'Commission']: t.partner.hero.entityBlock.commission,
              [locale === 'de' ? 'Aufwand' : 'Effort']: t.partner.hero.entityBlock.effort,
              'Support': t.partner.hero.entityBlock.support,
            }}
            variant="dark"
            layout="grid"
          />
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Impact Gap Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <H2 className="mb-6">{t.partner.impactGap.headline}</H2>
          <Body className="text-lg text-muted-foreground">
            {t.partner.impactGap.problem}
          </Body>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {t.partner.impactGap.metrics.map((metric, index) => (
            <Card key={index} className="text-center border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <MetricHighlight
                  label={metric.label}
                  value={metric.value}
                  variant="negative"
                  size="lg"
                  className="items-center"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Execution Trap Section */}
      <Section>
        <H2 className="text-center mb-12">{t.partner.executionTrap.headline}</H2>

        <div className="grid gap-6 sm:grid-cols-3">
          {t.partner.executionTrap.options.map((option, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <H3 className="mb-3">{option.title}</H3>
                <Body className="text-muted-foreground text-sm">
                  {option.consequence}
                </Body>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Partnership Model Section */}
      <Section className="bg-accent/30">
        <H2 className="text-center mb-12">{t.partner.partnershipModel.headline}</H2>
        <ProcessSteps steps={t.partner.partnershipModel.steps} layout="horizontal" />
      </Section>

      {/* Revenue Tables Section */}
      <Section>
        <H2 className="text-center mb-12">
          {locale === 'de' ? 'Einnahmen-Potenzial' : 'Revenue Potential'}
        </H2>

        <div className="grid gap-8 lg:grid-cols-2">
          <RevenueTable
            title={t.partner.revenueTable.build.title}
            columns={[
              { key: 'tier', label: 'Tier', align: 'left' },
              { key: 'clientPays', label: locale === 'de' ? 'Kunde zahlt' : 'Client Pays', align: 'right' },
              { key: 'partnerReceives', label: locale === 'de' ? 'Partner erhält' : 'Partner Receives', align: 'right', highlight: true },
            ]}
            rows={t.partner.revenueTable.build.rows}
          />

          <RevenueTable
            title={t.partner.revenueTable.recurring.title}
            columns={[
              { key: 'tier', label: 'Tier', align: 'left' },
              { key: 'monthly', label: locale === 'de' ? 'Monatlich' : 'Monthly', align: 'right' },
              { key: 'partnerMonthly', label: locale === 'de' ? 'Partner/Monat' : 'Partner/Month', align: 'right', highlight: true },
              { key: 'annual', label: locale === 'de' ? 'Jährlich' : 'Annual', align: 'right', highlight: true },
            ]}
            rows={t.partner.revenueTable.recurring.rows}
          />
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Case Studies Section */}
      <Section>
        <H2 className="text-center mb-12">{t.partner.caseStudies.headline}</H2>
        <CaseStudyGrid
          studies={t.partner.caseStudies.items}
          earnedLabel={locale === 'de' ? 'Verdient' : 'Earned'}
          effortLabel={locale === 'de' ? 'Aufwand' : 'Effort'}
        />
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Criteria Section */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <H2 className="text-center mb-8">{t.partner.criteria.headline}</H2>
          <CriteriaChecklist items={t.partner.criteria.items} />
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-midnight-navy text-white">
        <div className="max-w-2xl mx-auto text-center">
          <H2 className="mb-4">{t.partner.cta.headline}</H2>
          <Body className="text-stone-gray/80 mb-8">
            {t.partner.cta.description}
          </Body>
          <Button asChild size="lg" variant="secondary">
            <Link to={getLocalizedPath('/kontakt') + '?interest=partnership'}>
              {t.partner.cta.button}
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
