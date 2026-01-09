import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/section'
import { H1, H2, H3, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ArrowRightIcon } from '@/components/ui/icons'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema, ServiceSchema } from '@/components/seo'

const SITE_URL = 'https://br.luluwaldhund.de'

interface SolutionCardProps {
  title: string
  problem: string
  solution: string
  scope: string
}

function SolutionCard({ title, problem, solution, scope }: SolutionCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div>
          <H3 className="text-sm font-semibold text-muted-foreground mb-2">Problem</H3>
          <Body className="text-sm">{problem}</Body>
        </div>
        <div>
          <H3 className="text-sm font-semibold text-muted-foreground mb-2">Lösung</H3>
          <Body className="text-sm">{solution}</Body>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Small className="text-muted-foreground">{scope}</Small>
      </CardFooter>
    </Card>
  )
}

export function SolutionsPage() {
  const { t, getLocalizedPath, locale } = useI18n()

  const solutions = [
    t.solutions.crm,
    t.solutions.cpq,
    t.solutions.hr,
    t.solutions.integration,
  ]

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.solutions.title, url: `${SITE_URL}${locale === 'de' ? '/losungen' : '/en/solutions'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.solutions.title}
        description={t.seo.solutions.description}
      />
      <WebPageSchema
        title={t.seo.solutions.title}
        description={t.seo.solutions.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Custom Software Development"
        description={t.solutions.intro}
        timeRequired="P6W/P12W"
      />

      {/* Header */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <H1 className="mb-6">{t.solutions.title}</H1>
        <Body className="max-w-3xl text-lg text-muted-foreground">
          {t.solutions.intro}
        </Body>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Solution Cards */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.title}
              title={solution.title}
              problem={solution.problem}
              solution={solution.solution}
              scope={solution.scope}
            />
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
