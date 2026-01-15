import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  type Locale,
  type Translations,
  defaultLocale,
  getTranslations,
  locales,
} from '../../content'

const STORAGE_KEY = 'br-locale'

// Route mappings for paths that differ between locales
const routeMap: Record<string, { de: string; en: string }> = {
  'uber-uns': { de: 'uber-uns', en: 'about' },
  'about': { de: 'uber-uns', en: 'about' },
  'losungen': { de: 'losungen', en: 'solutions' },
  'solutions': { de: 'losungen', en: 'solutions' },
  'kontakt': { de: 'kontakt', en: 'contact' },
  'contact': { de: 'kontakt', en: 'contact' },
  'partner': { de: 'partner', en: 'partners' },
  'partners': { de: 'partner', en: 'partners' },
  'investoren': { de: 'investoren', en: 'investors' },
  'investors': { de: 'investoren', en: 'investors' },
}

interface I18nContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  getLocalizedPath: (path: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  return defaultLocale
}

function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale
  }
  return null
}

function storeLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, locale)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  const locale = useMemo(
    () => getLocaleFromPath(location.pathname),
    [location.pathname]
  )

  const t = useMemo(() => getTranslations(locale), [locale])

  useEffect(() => {
    storeLocale(locale)
    document.documentElement.lang = locale
  }, [locale])

  const getLocalizedPath = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const segments = cleanPath.split('/').filter(Boolean)

    // Remove existing locale prefix if present
    if (segments[0] && locales.includes(segments[0] as Locale)) {
      segments.shift()
    }

    // Translate route segments based on target locale
    const translatedSegments = segments.map(segment => {
      const mapping = routeMap[segment]
      return mapping ? mapping[locale] : segment
    })

    const basePath = translatedSegments.join('/')

    // German is default, no prefix needed
    if (locale === 'de') {
      return `/${basePath}` || '/'
    }

    // Other locales get prefix
    return `/${locale}${basePath ? `/${basePath}` : ''}`
  }

  const setLocale = (newLocale: Locale) => {
    const currentPath = location.pathname
    const segments = currentPath.split('/').filter(Boolean)

    // Remove existing locale prefix if present
    if (segments[0] && locales.includes(segments[0] as Locale)) {
      segments.shift()
    }

    // Translate route segments based on target locale
    const translatedSegments = segments.map(segment => {
      const mapping = routeMap[segment]
      return mapping ? mapping[newLocale] : segment
    })

    const basePath = translatedSegments.join('/')

    let newPath: string
    if (newLocale === 'de') {
      newPath = `/${basePath}` || '/'
    } else {
      newPath = `/${newLocale}${basePath ? `/${basePath}` : ''}`
    }

    storeLocale(newLocale)
    navigate(newPath)
  }

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale,
      getLocalizedPath,
    }),
    [locale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslations() {
  const { t } = useI18n()
  return t
}

export function useLocale() {
  const { locale, setLocale } = useI18n()
  return { locale, setLocale }
}
