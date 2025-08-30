import { focusManager } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState, Platform } from 'react-native'

/**
 * Sets up app focus management for TanStack Query
 * This enables automatic refetching when the app becomes active
 */
export function useAppFocusManager() {
  useEffect(() => {
    function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])
}
