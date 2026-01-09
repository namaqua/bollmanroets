import { Link } from 'react-router-dom'
import { useI18n, useTranslations } from '@/client/lib/i18n'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { DesktopNav, MobileNav } from './navigation'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const t = useTranslations()
  const { getLocalizedPath } = useI18n()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only',
          'focus:absolute focus:left-4 focus:top-4 focus:z-50',
          'focus:rounded-md focus:bg-background focus:px-4 focus:py-2',
          'focus:text-sm focus:font-medium focus:shadow-md',
          'focus:outline-none focus:ring-2 focus:ring-ring'
        )}
      >
        {t.a11y.skipToMain}
      </a>

      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            to={getLocalizedPath('/')}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1"
          >
            <span className="text-midnight-navy">Bollman</span>
            <span className="text-brass-gold">&</span>
            <span className="text-midnight-navy">Roets</span>
          </Link>

          <DesktopNav />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
