/**
 * Web Leads tracking utilities
 * Re-exports all tracking functions for convenient imports
 */

// Visitor data collection
export {
  getVisitorData,
  getDeviceType,
  getBrowserName,
  getBrowserVersion,
  getOS,
  getUTMParams,
  getScreenResolution,
  getTimezone,
  type VisitorData,
} from '../tracking'

// Session tracking
export {
  initSession,
  trackPageView,
  getSessionData,
  getSessionId,
  type SessionData,
  type SessionTrackingData,
} from '../session-tracking'

// Scroll and page time tracking
export {
  startScrollTracking,
  stopScrollTracking,
  getScrollDepth,
  getTimeOnPage,
  getScrollTrackingData,
  resetScrollTracking,
} from '../scroll-tracking'

// React integration
export {
  useTracking,
  getFormTrackingData,
  type FormTrackingData,
} from '../use-tracking'
