import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getNetworkStatus } from '../lib/networkManager'

export default function NetworkStatus() {
  const { data: networkState, isLoading } = useQuery({
    queryKey: ['network-status'],
    queryFn: getNetworkStatus,
    refetchInterval: 5000, // Check every 5 seconds
    staleTime: 1000,
  })

  if (isLoading) return null

  const isOnline = networkState?.isConnected && networkState?.isInternetReachable

  if (!isOnline) {
    return (
      <View className='p-safe' style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
        <Text style={styles.subText}>Please check your network settings</Text>
      </View>
    );
  }


  return null
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF3B30",
    // padding: 10,
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  subText: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
});
