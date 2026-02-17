import { Section } from '@/components/ui/section'
import { H1, H2, Body } from '@/components/ui/typography'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema } from '@/components/seo'

const SITE_URL = 'https://bollmann-roets.de'

export function ImpressumPage() {
  const { t, locale } = useI18n()

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.imprint.title, url: `${SITE_URL}${locale === 'de' ? '/impressum' : '/en/legal-notice'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.imprint.title}
        description={t.seo.imprint.description}
        noindex
      />
      <WebPageSchema
        title={t.seo.imprint.title}
        description={t.seo.imprint.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <H1 className="mb-6">{t.imprint.title}</H1>
      </Section>

      <Section className="pt-0">
        <div className="max-w-3xl space-y-10">
          {t.imprint.sections.map((section) => (
            <div key={section.heading}>
              <H2 className="mb-4">{section.heading}</H2>
              <Body className="text-muted-foreground whitespace-pre-line">
                {section.content}
              </Body>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
