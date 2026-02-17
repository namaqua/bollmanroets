import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, H3, Body } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon } from '@/components/ui/icons'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema } from '@/components/seo'

const SITE_URL = 'https://bollmann-roets.de'

export function AboutPage() {
  const { t, getLocalizedPath, locale } = useI18n()

  const steps = [
    t.about.howWeWork.steps.discovery,
    t.about.howWeWork.steps.pilot,
    t.about.howWeWork.steps.build,
    t.about.howWeWork.steps.support,
  ]

  const values = [
    t.about.values.precision,
    t.about.values.bespoke,
    t.about.values.trust,
    t.about.values.efficiency,
    t.about.values.partnership,
  ]

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.about.title, url: `${SITE_URL}${locale === 'de' ? '/uber-uns' : '/en/about'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.about.title}
        description={t.seo.about.description}
      />
      <WebPageSchema
        title={t.seo.about.title}
        description={t.seo.about.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Header */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <H1 className="mb-6">{t.about.title}</H1>
      </Section>

      {/* Our Approach */}
      <Section className="pt-0">
        <div className="max-w-3xl">
          <H2 className="mb-6">{t.about.approach.title}</H2>
          <Body className="text-lg text-muted-foreground">
            {t.about.approach.description}
          </Body>
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* What We Build */}
      <Section>
        <div className="max-w-3xl">
          <H2 className="mb-6">{t.about.whatWeBuild.title}</H2>
          <Body className="text-lg text-muted-foreground">
            {t.about.whatWeBuild.description}
          </Body>
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* How We Work - Process */}
      <Section className="bg-muted/30">
        <H2 className="mb-4">{t.about.howWeWork.title}</H2>
        <Body className="text-lg text-muted-foreground mb-12 max-w-3xl">
          {t.about.howWeWork.description}
        </Body>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <H3 className="mb-2">{step.title}</H3>
                  <Body className="text-sm text-muted-foreground">
                    {step.description}
                  </Body>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-12 hidden h-full w-px bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section>
        <H2 className="mb-12 text-center">{t.about.values.title}</H2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Body className="text-sm text-muted-foreground">
                  {value.description}
                </Body>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <H2 className="mb-4">{t.home.cta.title}</H2>
          <Body className="text-lg text-muted-foreground mb-8">
            {t.home.cta.description}
          </Body>
          <Button asChild size="lg">
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
