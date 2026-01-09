/**
 * Scroll depth and page time tracking for Web Leads API integration
 */

let maxScrollDepth = 0
let pageLoadTime: number | null = null
let scrollListener: (() => void) | null = null

/**
 * Calculate current scroll depth percentage
 */
function calculateScrollDepth(): number {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollHeight <= 0) return 100 // Page is not scrollable
  const currentScroll = window.scrollY
  return Math.min(100, Math.round((currentScroll / scrollHeight) * 100))
}

/**
 * Handle scroll event
 */
function handleScroll(): void {
  const currentDepth = calculateScrollDepth()
  if (currentDepth > maxScrollDepth) {
    maxScrollDepth = currentDepth
  }
}

/**
 * Start tracking scroll depth for the current page
 * Call this when a page loads or on route change
 */
export function startScrollTracking(): void {
  // Reset tracking state
  maxScrollDepth = 0
  pageLoadTime = Date.now()

  // Remove existing listener if any
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }

  // Set up new listener
  scrollListener = handleScroll
  window.addEventListener('scroll', scrollListener, { passive: true })

  // Calculate initial scroll depth (in case page loads scrolled)
  handleScroll()
}

/**
 * Stop tracking scroll depth
 * Call this when leaving the page or on cleanup
 */
export function stopScrollTracking(): void {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    scrollListener = null
  }
}

/**
 * Get current maximum scroll depth (0-100)
 */
export function getScrollDepth(): number {
  return maxScrollDepth
}

/**
 * Get time spent on current page in seconds
 */
export function getTimeOnPage(): number {
  if (!pageLoadTime) return 0
  return Math.floor((Date.now() - pageLoadTime) / 1000)
}

/**
 * Get scroll tracking data for form submission
 */
export function getScrollTrackingData(): {
  scrollDepth: number
  timeOnFormPage: number
} {
  return {
    scrollDepth: maxScrollDepth,
    timeOnFormPage: getTimeOnPage(),
  }
}

/**
 * Reset scroll tracking (useful for testing or page transitions)
 */
export function resetScrollTracking(): void {
  maxScrollDepth = 0
  pageLoadTime = null
}
