"use client"

import { useCallback } from "react"
import { WebHaptics, defaultPatterns } from "web-haptics"

// Singleton WebHaptics instance shared across the app
let _haptics: WebHaptics | null = null

function getHaptics(): WebHaptics | null {
  if (typeof window === "undefined") return null
  if (!_haptics) {
    _haptics = new WebHaptics()
  }
  return _haptics
}

/**
 * useHaptics - A hook providing haptic feedback triggers for interactive elements.
 * Uses the web-haptics library which leverages the Vibration API + Web Audio API.
 * Only fires on devices that support haptics; gracefully no-ops elsewhere.
 */
export function useHaptics() {
  const triggerLight = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.light)
  }, [])

  const triggerMedium = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.medium)
  }, [])

  const triggerHeavy = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.heavy)
  }, [])

  const triggerSelection = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.selection)
  }, [])

  const triggerSuccess = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.success)
  }, [])

  const triggerWarning = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.warning)
  }, [])

  const triggerError = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.error)
  }, [])

  const triggerSoft = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.soft)
  }, [])

  const triggerRigid = useCallback(() => {
    getHaptics()?.trigger(defaultPatterns.rigid)
  }, [])

  return {
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSelection,
    triggerSuccess,
    triggerWarning,
    triggerError,
    triggerSoft,
    triggerRigid,
  }
}
