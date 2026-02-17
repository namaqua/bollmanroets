import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n, useTranslations } from '@/client/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  CloseIcon,
  HandshakeIcon,
  LockIcon,
  MenuIcon,
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'

interface NavItem {
  labelKey: 'home' | 'about' | 'solutions' | 'contact'
  href: string
}

const navItems: NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'about', href: '/uber-uns' },
  { labelKey: 'solutions', href: '/losungen' },
  { labelKey: 'contact', href: '/kontakt' },
]

interface PortalLink {
  labelKey: 'clientPortal' | 'partnerPortal'
  tooltipKey: 'clientPortalTooltip' | 'partnerPortalTooltip'
  href: string
  icon: typeof LockIcon
}

const portalLinks: PortalLink[] = [
  {
    labelKey: 'clientPortal',
    tooltipKey: 'clientPortalTooltip',
    href: '#',
    icon: LockIcon,
  },
  {
    labelKey: 'partnerPortal',
    tooltipKey: 'partnerPortalTooltip',
    href: '#',
    icon: HandshakeIcon,
  },
]

function isActiveRoute(pathname: string, href: string, locale: string): boolean {
  const cleanPath = pathname.replace(/^\/en/, '') || '/'
  return cleanPath === href || (href !== '/' && cleanPath.startsWith(href))
}

export function DesktopNav({ className }: { className?: string }) {
  const t = useTranslations()
  const { locale, getLocalizedPath } = useI18n()
  const location = useLocation()

  return (
    <nav
      className={cn('hidden lg:flex items-center gap-6', className)}
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = isActiveRoute(location.pathname, item.href, locale)
          return (
            <li key={item.href}>
              <Link
                to={getLocalizedPath(item.href)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors rounded-md',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brass-gold'
                    : 'text-muted-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {t.nav[item.labelKey]}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="h-6 w-px bg-border" aria-hidden="true" />

      <div className="flex items-center gap-2">
        {portalLinks.map((portal) => {
          const Icon = portal.icon
          return (
            <a
              key={portal.labelKey}
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative flex items-center gap-1.5 px-2 py-1.5 text-sm text-muted-foreground',
                'transition-colors hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md'
              )}
              title={t.nav[portal.tooltipKey]}
            >
              <Icon size={16} />
              <span className="sr-only lg:not-sr-only">
                {t.nav[portal.labelKey]}
              </span>
            </a>
          )
        })}
      </div>

      <LanguageSwitcher />
    </nav>
  )
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const { locale, getLocalizedPath } = useI18n()
  const location = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="min-h-[44px] min-w-[44px]"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? t.a11y.closeMenu : t.a11y.openMenu}
      >
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <nav
            id="mobile-menu"
            className="fixed inset-x-0 top-0 z-50 flex flex-col bg-background shadow-lg"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Link
                to={getLocalizedPath('/')}
                onClick={closeMenu}
                className="flex items-center gap-1 text-xl font-bold"
              >
                <span className="font-brand font-semibold">b&amp;r</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="min-h-[44px] min-w-[44px]"
                aria-label={t.a11y.closeMenu}
              >
                <CloseIcon size={24} />
              </Button>
            </div>

            <ul className="flex flex-col p-4">
              {navItems.map((item) => {
                const isActive = isActiveRoute(location.pathname, item.href, locale)
                return (
                  <li key={item.href}>
                    <Link
                      to={getLocalizedPath(item.href)}
                      onClick={closeMenu}
                      className={cn(
                        'flex min-h-[44px] items-center px-3 py-3 text-base font-medium rounded-md',
                        'transition-colors',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t.nav[item.labelKey]}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="border-t px-4 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Portale
              </p>
              <ul className="flex flex-col gap-1">
                {portalLinks.map((portal) => {
                  const Icon = portal.icon
                  return (
                    <li key={portal.labelKey}>
                      <a
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex min-h-[44px] items-center gap-3 px-3 py-3 text-base text-muted-foreground',
                          'transition-colors hover:text-foreground rounded-md hover:bg-accent'
                        )}
                      >
                        <Icon size={20} />
                        {t.nav[portal.labelKey]}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t px-4 py-4">
              <LanguageSwitcher variant="default" />
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
