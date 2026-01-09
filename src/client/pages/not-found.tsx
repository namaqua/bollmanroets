import { Link } from 'react-router-dom'
import { useI18n, useTranslations } from '@/client/lib/i18n'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { H1, Body } from '@/components/ui/typography'
import { ArrowRightIcon } from '@/components/ui/icons'
import { SEO } from '@/components/seo'

export function NotFoundPage() {
  const t = useTranslations()
  const { getLocalizedPath } = useI18n()

  return (
    <>
      <SEO
        title={t.errors.pageNotFound}
        description={t.errors.pageNotFoundMessage}
        noindex
      />
    <div className="flex min-h-[60vh] items-center py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-4 font-mono text-6xl font-bold text-muted-foreground/30">
            404
          </p>
          <H1 className="mb-4">{t.errors.pageNotFound}</H1>
          <Body className="mb-8 text-muted-foreground">
            {t.errors.pageNotFoundMessage}
          </Body>
          <Button asChild>
            <Link to={getLocalizedPath('/')}>
              {t.errors.backToHome}
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
    </>
  )
}
