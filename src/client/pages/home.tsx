import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, H3, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'
import { BrandName } from '@/components/ui/brand-name'
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
          <H1 className="mb-6 max-w-4xl">
            <BrandName />
            <br />
            {t.home.strapline}
          </H1>
          <Body className="max-w-2xl text-lg text-muted-foreground mb-8">
            {t.home.heroText.split('. ').map((sentence, i, arr) => (
              <span key={i}>
                {sentence}{i < arr.length - 1 ? '.' : ''}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
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
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded border border-primary/20 bg-primary/5">
                <CheckIcon size={20} className="text-primary" />
              </div>
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
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded border border-primary/20 bg-primary/5">
                <ArrowRightIcon size={20} className="text-primary" />
              </div>
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
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded border border-primary/20 bg-primary/5">
                <CheckIcon size={20} className="text-primary" />
              </div>
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

      {/* Comparison Section */}
      <Section className="bg-muted/30">
        <H2 className="mb-12 text-center">{t.home.comparison.title}</H2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <H3>{t.home.comparison.vsEnterprise.title}</H3>
            <Body className="text-muted-foreground">
              {t.home.comparison.vsEnterprise.description}
            </Body>
          </div>
          <div className="space-y-3">
            <H3>{t.home.comparison.vsOffshore.title}</H3>
            <Body className="text-muted-foreground">
              {t.home.comparison.vsOffshore.description}
            </Body>
          </div>
          <div className="space-y-3">
            <H3>{t.home.comparison.vsDiy.title}</H3>
            <Body className="text-muted-foreground">
              {t.home.comparison.vsDiy.description}
            </Body>
          </div>
        </div>
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
