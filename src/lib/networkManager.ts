import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

/**
 * Sets up network status monitoring for TanStack Query
 * This enables automatic refetching when the device comes back online
 */
export function setupNetworkStatus() {
  onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected)
    })
    return eventSubscription.remove
  })
}

/**
 * Get current network status
 */
export async function getNetworkStatus() {
  const state = await Network.getNetworkStateAsync()
  return {
    isConnected: state.isConnected,
    isInternetReachable: state.isInternetReachable,
    type: state.type,
  }
}
