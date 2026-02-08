import { logScreenView } from "@/src/lib/analytics";
import { usePathname } from "expo-router";
import { useEffect } from "react";

/**
 * Hook to automatically track screen views in Firebase Analytics
 * Add this to screens you want to track
 */
export const useAnalyticsScreenTracking = (screenName?: string) => {
  const pathname = usePathname();

  useEffect(() => {
    const screen =
      screenName || pathname.replace("/", "").replace(/-/g, "_") || "home";
    logScreenView(screen);
  }, [pathname, screenName]);
};
