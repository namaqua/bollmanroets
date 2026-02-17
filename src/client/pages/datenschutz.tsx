import { Section } from '@/components/ui/section'
import { H1, H2, Body } from '@/components/ui/typography'
import { useI18n } from '@/client/lib/i18n'
import { SEO, BreadcrumbSchema, WebPageSchema } from '@/components/seo'

const SITE_URL = 'https://bollmann-roets.de'

export function DatenschutzPage() {
  const { t, locale } = useI18n()

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.privacy.title, url: `${SITE_URL}${locale === 'de' ? '/datenschutz' : '/en/privacy'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.privacy.title}
        description={t.seo.privacy.description}
        noindex
      />
      <WebPageSchema
        title={t.seo.privacy.title}
        description={t.seo.privacy.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <H1 className="mb-6">{t.privacy.title}</H1>
      </Section>

      <Section className="pt-0">
        <div className="max-w-3xl space-y-10">
          {t.privacy.sections.map((section) => (
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
