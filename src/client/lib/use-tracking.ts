/**
 * React hook for initializing and managing visitor tracking
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initSession, trackPageView, getSessionData, type SessionTrackingData } from './session-tracking'
import { getVisitorData, type VisitorData } from './tracking'
import { startScrollTracking, stopScrollTracking, getScrollTrackingData } from './scroll-tracking'

export interface FormTrackingData extends VisitorData, SessionTrackingData {
  scrollDepth: number
  timeOnFormPage: number
  formName: string
}

/**
 * Hook to initialize tracking on app load and track page views on route changes
 * Place this in your root App component or layout
 */
export function useTracking(): void {
  const location = useLocation()
  const isInitialized = useRef(false)

  // Initialize session on first mount
  useEffect(() => {
    if (!isInitialized.current) {
      initSession()
      isInitialized.current = true
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname)
    startScrollTracking()

    return () => {
      stopScrollTracking()
    }
  }, [location.pathname])
}

/**
 * Get all tracking data for form submission
 * Call this when submitting a form to capture complete visitor context
 */
export function getFormTrackingData(formName: string = 'contact'): FormTrackingData {
  const visitorData = getVisitorData()
  const sessionData = getSessionData()
  const scrollData = getScrollTrackingData()

  return {
    ...visitorData,
    ...sessionData,
    ...scrollData,
    formName,
  }
}
