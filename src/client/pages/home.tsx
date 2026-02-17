import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon } from '@/components/ui/icons'
import { BrandName } from '@/components/ui/brand-name'
import { TargetGroupGrid } from '@/components/ui/target-group-card'
import { ComparisonGrid } from '@/components/ui/comparison-grid'
import { ProofGrid } from '@/components/ui/proof-card'
import { QuoteBox } from '@/components/ui/quote-box'
import { useI18n } from '@/client/lib/i18n'
import { SEO, WebPageSchema } from '@/components/seo'

export function HomePage() {
  const { t, locale, getLocalizedPath } = useI18n()

  return (
    <>
      <SEO
        title={t.seo.home.title}
        description={t.seo.home.description}
      />
      <WebPageSchema
        title={t.seo.home.title}
        description={t.seo.home.description}
      />
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative">
          <Small className="text-brass-gold font-medium mb-4 block">
            <BrandName /> | {t.home.strapline}
          </Small>
          <H1 className="mb-4 max-w-4xl">
            {t.home.headline}
          </H1>
          <Body className="max-w-2xl text-xl text-muted-foreground mb-4 font-medium">
            {t.home.subheadline}
          </Body>
          <Body className="max-w-2xl text-lg text-muted-foreground mb-8">
            {t.home.heroText}
          </Body>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to={getLocalizedPath('/kontakt')}>
                {t.buttons.learnMore}
                <ArrowRightIcon size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Value Propositions */}
      <Section>
        <H2 className="mb-12 text-center">
          <BrandName prefix={locale === 'de' ? 'Warum' : 'Why'} />
        </H2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t.home.valueProps.yourCode.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Body className="text-muted-foreground">
                {t.home.valueProps.yourCode.description}
              </Body>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.home.valueProps.fastDelivery.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Body className="text-muted-foreground">
                {t.home.valueProps.fastDelivery.description}
              </Body>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.home.valueProps.enterpriseQuality.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Body className="text-muted-foreground">
                {t.home.valueProps.enterpriseQuality.description}
              </Body>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Target Group Section */}
      <Section>
        <div className="text-center mb-12">
          <Small className="text-brass-gold font-medium mb-4 block">
            {t.home.targetGroup.label}
          </Small>
          <H2>{t.home.targetGroup.headline}</H2>
        </div>
        <TargetGroupGrid cards={t.home.targetGroup.cards} />
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Comparison Section */}
      <Section className="bg-muted/30">
        <H2 className="mb-12 text-center">{t.home.comparison.title}</H2>
        <ComparisonGrid columns={t.home.comparison.columns} />
      </Section>

      {/* Solutions Teaser */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <H2 className="mb-4">{t.home.solutions.title}</H2>
          <Body className="text-lg text-muted-foreground mb-8">
            {t.home.solutions.description}
          </Body>
          <Button variant="outline" asChild>
            <Link to={getLocalizedPath('/losungen')}>
              {t.buttons.learnMore}
              <ArrowRightIcon size={18} />
            </Link>
          </Button>
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Projects Section */}
      <Section>
        <div className="text-center mb-12">
          <Small className="text-brass-gold font-medium mb-4 block">
            {t.home.projects.label}
          </Small>
          <H2>{t.home.projects.headline}</H2>
        </div>
        <ProofGrid items={t.home.projects.items} className="mb-12" />
        <div className="max-w-2xl mx-auto">
          <QuoteBox
            quote={t.home.projects.quote.text}
            attribution={t.home.projects.quote.attribution}
            variant="centered"
          />
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Trust Signal */}
      <Section className="py-12">
        <div className="text-center">
          <Small className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
            {t.home.trust.text}
          </Small>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center max-w-2xl mx-auto">
          <H2 className="mb-4 text-primary-foreground">{t.home.cta.title}</H2>
          <Body className="text-lg text-primary-foreground/80 mb-8">
            {t.home.cta.description}
          </Body>
          <Button
            variant="secondary"
            size="lg"
            asChild
          >
            <Link to={getLocalizedPath('/kontakt')}>
              {t.buttons.sendMessage}
              <ArrowRightIcon size={18} />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
