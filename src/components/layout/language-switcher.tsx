import { useLocale, useTranslations } from '@/client/lib/i18n'
import { Button } from '@/components/ui/button'
import { GlobeIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()
  const t = useTranslations()

  const toggleLocale = () => {
    setLocale(locale === 'de' ? 'en' : 'de')
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLocale}
        className={cn('gap-1.5 text-sm font-medium', className)}
        aria-label={t.language.switch}
      >
        <GlobeIcon size={16} />
        <span>{locale === 'de' ? 'EN' : 'DE'}</span>
      </Button>
    )
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant={locale === 'de' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('de')}
        className="px-2 text-sm"
        aria-label={t.language.german}
        aria-current={locale === 'de' ? 'true' : undefined}
      >
        DE
      </Button>
      <span className="text-muted-foreground">/</span>
      <Button
        variant={locale === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className="px-2 text-sm"
        aria-label={t.language.english}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </Button>
    </div>
  )
}
