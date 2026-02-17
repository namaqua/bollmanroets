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
    partner: { title: string; description: string }
    investor: { title: string; description: string }
    imprint: { title: string; description: string }
    privacy: { title: string; description: string }
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
    more: string
    partner: string
    investor: string
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
      investment: string
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
    headline: string
    subheadline: string
    heroText: string
    valueProps: {
      title: string
      yourCode: { title: string; description: string }
      fastDelivery: { title: string; description: string }
      enterpriseQuality: { title: string; description: string }
    }
    targetGroup: {
      label: string
      headline: string
      cards: readonly { icon: string; title: string; description: string }[]
    }
    comparison: {
      title: string
      vsEnterprise: { title: string; description: string }
      vsOffshore: { title: string; description: string }
      vsDiy: { title: string; description: string }
      columns: readonly { title: string; highlight: boolean; points: readonly string[] }[]
    }
    projects: {
      label: string
      headline: string
      items: readonly { title: string; description: string; timeline: string; icon: string }[]
      quote: { text: string; attribution: string }
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
    directContact: { title: string; email: string; phone: string }
  }
  imprint: {
    title: string
    intro: string
    sections: readonly { heading: string; content: string }[]
  }
  privacy: {
    title: string
    intro: string
    sections: readonly { heading: string; content: string }[]
  }
  partner: {
    title: string
    hero: {
      headline: string
      subheadline: string
      entityBlock: {
        role: string
        commission: string
        effort: string
        support: string
      }
    }
    impactGap: {
      headline: string
      problem: string
      metrics: readonly { label: string; value: string }[]
    }
    executionTrap: {
      headline: string
      options: readonly { title: string; consequence: string }[]
    }
    partnershipModel: {
      headline: string
      steps: readonly { actor: string; action: string }[]
    }
    revenueTable: {
      build: {
        title: string
        rows: readonly { tier: string; clientPays: string; partnerReceives: string }[]
      }
      recurring: {
        title: string
        rows: readonly { tier: string; monthly: string; partnerMonthly: string; annual: string }[]
      }
    }
    caseStudies: {
      headline: string
      items: readonly { profile: string; project: string; earned: string; effort: string }[]
    }
    criteria: {
      headline: string
      items: readonly string[]
    }
    cta: {
      headline: string
      description: string
      button: string
    }
  }
  investor: {
    title: string
    hero: {
      headline: string
      subheadline: string
      entityBlock: {
        company: string
        model: string
        aiGeneration: string
        delivery: string
        cost: string
        margin: string
      }
    }
    moat: {
      headline: string
      layers: readonly { name: string; mechanism: string; impact: string }[]
      compoundingEffect: string
    }
    financials: {
      headline: string
      unitEconomics: {
        title: string
        rows: readonly { metric: string; year1: string; year3: string; change: string }[]
      }
      patternGrowth: {
        title: string
        rows: readonly { year: string; patterns: string; margin: string }[]
      }
    }
    market: {
      headline: string
      tam: { label: string; value: string; description: string }
      sam: { label: string; value: string; description: string }
      som: { label: string; value: string; description: string }
      penetration: readonly { year: string; clients: string; revenue: string }[]
    }
    competitive: {
      vsSaas: {
        title: string
        dimensions: readonly { dimension: string; competitor: string; us: string }[]
      }
      vsDev: {
        title: string
        dimensions: readonly { dimension: string; competitor: string; us: string }[]
      }
    }
    traction: {
      headline: string
      status: string
      pipeline: string
      partnerInterest: string
      team: string
      runway: string
    }
    cta: {
      headline: string
      button: string
    }
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
