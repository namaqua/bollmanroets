import { Link } from 'react-router-dom'
import { useI18n, useTranslations } from '@/client/lib/i18n'
import { Container } from '@/components/ui/container'
import { Divider } from '@/components/ui/divider'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const t = useTranslations()
  const { locale, getLocalizedPath } = useI18n()

  const legalLinks = [
    { label: t.footer.imprint, href: '/impressum' },
    { label: t.footer.privacy, href: '/datenschutz' },
  ]

  return (
    <footer className={cn('border-t bg-muted/30', className)}>
      <Container>
        <div className="py-8 lg:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 text-lg font-bold">
              <span className="text-midnight-navy">B</span>
              <span className="text-brass-gold">+</span>
              <span className="text-midnight-navy">R</span>
            </div>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-4 sm:gap-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={getLocalizedPath(link.href)}
                      className={cn(
                        'text-sm text-muted-foreground transition-colors',
                        'hover:text-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Divider className="my-6" />

          <p className="text-center text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  )
}
