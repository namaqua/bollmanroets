import { de } from './de/common'
import { en } from './en/common'

export type Locale = 'de' | 'en'

export interface Translations {
  seo: {
    defaultDescription: string
    home: { title: string; description: string }
    about: { title: string; description: string }
    solutions: { title: string; description: string }
    contact: { title: string; description: string }
  }
  nav: {
    home: string
    about: string
    solutions: string
    contact: string
    clientPortal: string
    partnerPortal: string
    clientPortalTooltip: string
    partnerPortalTooltip: string
  }
  buttons: {
    learnMore: string
    submit: string
    sendMessage: string
  }
  form: {
    name: string
    company: string
    email: string
    phone: string
    interest: string
    message: string
    required: string
    invalidEmail: string
    privacyConsent: string
    marketingConsent: string
    selectOption: string
    sending: string
    success: string
    error: string
    interestOptions: {
      discoveryDay: string
      pilot: string
      partnership: string
      general: string
    }
  }
  errors: {
    pageNotFound: string
    pageNotFoundMessage: string
    backToHome: string
  }
  footer: {
    imprint: string
    privacy: string
    copyright: string
  }
  language: {
    switch: string
    german: string
    english: string
  }
  a11y: {
    skipToMain: string
    menu: string
    closeMenu: string
    openMenu: string
  }
  home: {
    strapline: string
    heroText: string
    valueProps: {
      title: string
      yourCode: { title: string; description: string }
      fastDelivery: { title: string; description: string }
      enterpriseQuality: { title: string; description: string }
    }
    comparison: {
      title: string
      vsEnterprise: { title: string; description: string }
      vsOffshore: { title: string; description: string }
      vsDiy: { title: string; description: string }
    }
    solutions: { title: string; description: string }
    trust: { text: string }
    cta: { title: string; description: string }
  }
  about: {
    title: string
    approach: { title: string; description: string }
    whatWeBuild: { title: string; description: string }
    howWeWork: {
      title: string
      description: string
      steps: {
        discovery: { title: string; description: string }
        pilot: { title: string; description: string }
        build: { title: string; description: string }
        support: { title: string; description: string }
      }
    }
    values: {
      title: string
      precision: { title: string; description: string }
      bespoke: { title: string; description: string }
      trust: { title: string; description: string }
      efficiency: { title: string; description: string }
      partnership: { title: string; description: string }
    }
  }
  solutions: {
    title: string
    intro: string
    crm: { title: string; problem: string; solution: string; scope: string }
    cpq: { title: string; problem: string; solution: string; scope: string }
    hr: { title: string; problem: string; solution: string; scope: string }
    integration: { title: string; problem: string; solution: string; scope: string }
  }
  contact: {
    title: string
    intro: string
    discoveryDay: { title: string; description: string; includes: string }
    directContact: { title: string; email: string; phone: string; address: string }
  }
}

export const translations: Record<Locale, Translations> = {
  de,
  en,
}

export const defaultLocale: Locale = 'de'

export const locales: Locale[] = ['de', 'en']

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale]
}
