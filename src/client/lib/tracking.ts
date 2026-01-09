/**
 * Visitor tracking utilities for Web Leads API integration
 */

export interface VisitorData {
  sourceUrl: string
  referrerUrl: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  timezone: string
  browserLanguage: string
  deviceType: 'desktop' | 'tablet' | 'mobile'
  os: string
  browserName: string
  browserVersion: string | null
  screenResolution: string
}

/**
 * Get device type based on user agent
 */
export function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  const ua = navigator.userAgent.toLowerCase()
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) return 'mobile'
  return 'desktop'
}

/**
 * Get browser name from user agent
 */
export function getBrowserName(): string {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
  return 'Unknown'
}

/**
 * Get browser version from user agent
 */
export function getBrowserVersion(): string | null {
  const ua = navigator.userAgent
  // Match common browser version patterns
  const patterns = [
    /(?:Firefox|FxiOS)\/(\d+)/,
    /(?:Edg|Edge)\/(\d+)/,
    /(?:Chrome|CriOS)\/(\d+)/,
    /(?:Version)\/(\d+).*Safari/,
    /(?:Opera|OPR)\/(\d+)/,
  ]

  for (const pattern of patterns) {
    const match = ua.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Get operating system from user agent
 */
export function getOS(): string {
  const ua = navigator.userAgent
  if (ua.includes('Windows NT 10') || ua.includes('Windows NT 11')) return 'Windows'
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac OS X')) return 'macOS'
  if (ua.includes('Linux') && !ua.includes('Android')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS'
  if (ua.includes('CrOS')) return 'Chrome OS'
  return 'Unknown'
}

/**
 * Get UTM parameters from URL
 */
export function getUTMParams(): {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
} {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmContent: urlParams.get('utm_content'),
    utmTerm: urlParams.get('utm_term'),
  }
}

/**
 * Get screen resolution
 */
export function getScreenResolution(): string {
  return `${screen.width}x${screen.height}`
}

/**
 * Get timezone
 */
export function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'Unknown'
  }
}

/**
 * Collect all visitor data for form submission
 */
export function getVisitorData(): VisitorData {
  const utmParams = getUTMParams()

  return {
    sourceUrl: window.location.href,
    referrerUrl: document.referrer || null,
    ...utmParams,
    timezone: getTimezone(),
    browserLanguage: navigator.language,
    deviceType: getDeviceType(),
    os: getOS(),
    browserName: getBrowserName(),
    browserVersion: getBrowserVersion(),
    screenResolution: getScreenResolution(),
  }
}
