/**
 * Session tracking for Web Leads API integration
 * Tracks visitor journey across page views within a session
 */

const SESSION_KEY = 'br_session'
const VISITOR_KEY = 'br_visitor'

export interface SessionData {
  sessionId: string
  entryPage: string
  pagesViewed: string[]
  startTime: number
}

export interface SessionTrackingData {
  sessionId: string
  entryPage: string
  pagesViewed: string[]
  pageCount: number
  timeOnSite: number
  returningVisitor: boolean
}

/**
 * Generate a UUID for session identification
 */
function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Get the current page path
 */
function getCurrentPath(): string {
  return window.location.pathname
}

/**
 * Check if this is a returning visitor (has visited before in a previous session)
 */
function isReturningVisitor(): boolean {
  try {
    return localStorage.getItem(VISITOR_KEY) === 'true'
  } catch {
    return false
  }
}

/**
 * Mark visitor as having visited before
 */
function markVisitorAsReturning(): void {
  try {
    localStorage.setItem(VISITOR_KEY, 'true')
  } catch {
    // localStorage not available, ignore
  }
}

/**
 * Get session from sessionStorage
 */
function getStoredSession(): SessionData | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (!stored) return null
    return JSON.parse(stored) as SessionData
  } catch {
    return null
  }
}

/**
 * Save session to sessionStorage
 */
function storeSession(session: SessionData): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // sessionStorage not available, ignore
  }
}

/**
 * Initialize or resume a session
 * Call this on app load
 */
export function initSession(): SessionData {
  let session = getStoredSession()
  const currentPath = getCurrentPath()

  if (!session) {
    // New session
    session = {
      sessionId: generateSessionId(),
      entryPage: currentPath,
      pagesViewed: [currentPath],
      startTime: Date.now(),
    }
    storeSession(session)
    // Mark as returning for future visits
    markVisitorAsReturning()
  }

  return session
}

/**
 * Track a page view within the current session
 * Call this on route changes
 */
export function trackPageView(path?: string): void {
  const session = getStoredSession()
  if (!session) {
    initSession()
    return
  }

  const currentPath = path || getCurrentPath()

  // Only add if not already the last page viewed
  if (session.pagesViewed[session.pagesViewed.length - 1] !== currentPath) {
    session.pagesViewed.push(currentPath)
    storeSession(session)
  }
}

/**
 * Get session tracking data for form submission
 */
export function getSessionData(): SessionTrackingData {
  const session = getStoredSession() || initSession()

  return {
    sessionId: session.sessionId,
    entryPage: session.entryPage,
    pagesViewed: session.pagesViewed,
    pageCount: session.pagesViewed.length,
    timeOnSite: Math.floor((Date.now() - session.startTime) / 1000),
    returningVisitor: isReturningVisitor(),
  }
}

/**
 * Get current session ID (useful for debugging)
 */
export function getSessionId(): string | null {
  const session = getStoredSession()
  return session?.sessionId || null
}
