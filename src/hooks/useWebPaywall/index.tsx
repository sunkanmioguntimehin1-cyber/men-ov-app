// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useState } from "react";
// import Purchases from "react-native-purchases";

// // ✅ Replace with your URL from RevenueCat dashboard
// // Dashboard → Product catalog → Offerings → default → Web Purchase Link
// // const WEB_PAYWALL_URL = "https://your-revenuecat-web-paywall-url";
// // const WEB_PAYWALL_URL = "https://pay.rev.cat/sandbox/mdhvqdvlguvgpdok/1234";
// const getPaywallUrl = (appUserId: string) =>
//   `https://pay.rev.cat/sandbox/mdhvqdvlguvgpdok/${appUserId}`;

// // ✅ Replace with your app's deep link scheme (set in app.json → expo.scheme)
// const SUCCESS_REDIRECT_SCHEME = "menovia://paywallSuccess";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const useWebPaywall = () => {
//   const [isPurchasing, setIsPurchasing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const syncEntitlements = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const info = await Purchases.restorePurchases();
//       const hasPro = info.entitlements.active["pro"] !== undefined;

//       if (!hasPro) {
//         // Poll a few times — web purchases take a moment to propagate
//         for (let i = 0; i < 3; i++) {
//           await delay(2000);
//           const retryInfo = await Purchases.getCustomerInfo();
//           if (retryInfo.entitlements.active["pro"]) return retryInfo;
//         }
//       }
//       return info;
//     } catch (err) {
//       console.error("[WebPaywall] sync error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const openWebPaywall = useCallback(
//     async (appUserId: string) => {
//       const url = getPaywallUrl(appUserId);
//       try {
//         setIsPurchasing(true);
//         setError(null);

//         const result = await WebBrowser.openAuthSessionAsync(
//           url,
//           SUCCESS_REDIRECT_SCHEME,
//           {
//             preferEphemeralSession: false,
//             presentationStyle:
//               WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
//             toolbarColor: "#0F0F0F",
//             showTitle: false,
//           },
//         );

//         if (result.type === "success") {
//           // Deep link matched → purchase completed → sync
//           await syncEntitlements();
//         }
//       } catch (err: any) {
//         setError(err.message ?? "Failed to open paywall");
//       } finally {
//         setIsPurchasing(false);
//       }
//     },
//     [syncEntitlements],
//   );

//   return { openWebPaywall, syncEntitlements, isPurchasing, isLoading, error };
// };

// export default useWebPaywall;

import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";
import { CustomerInfo } from "react-native-purchases";

const getPaywallUrl = (appUserId: string) =>
  `https://pay.rev.cat/sandbox/mdhvqdvlguvgpdok/${appUserId}`;

const SUCCESS_REDIRECT_SCHEME = "menovia://paywallSuccess";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useWebPaywall = (
  fetchCustomerInfo: () => Promise<CustomerInfo | null>,
) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const syncEntitlements = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const info = await Purchases.restorePurchases();
  //     const hasPro = info.entitlements.active["pro"] !== undefined;

  //     if (!hasPro) {
  //       for (let i = 0; i < 3; i++) {
  //         await delay(2000);
  //         const retryInfo = await Purchases.getCustomerInfo();
  //         if (retryInfo.entitlements.active["pro"]) return retryInfo;
  //       }
  //     }
  //     return info;
  //   } catch (err) {
  //     console.error("[WebPaywall] sync error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const syncEntitlements = useCallback(async () => {
    try {
      setIsLoading(true);

      // Poll up to 3x — web purchases take a moment to propagate
      for (let i = 0; i < 3; i++) {
        await delay(2000);
        const info = await fetchCustomerInfo(); // ← hits REST API directly
        if (info?.entitlements?.[ENTITLEMENT_ID]) {
          const expires = info.entitlements[ENTITLEMENT_ID].expires_date;
          if (!expires || new Date(expires) > new Date()) return info; // ✅ active
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchCustomerInfo]);

  // Handles redemption link embedded in the success redirect URL
  const handleRedirectResult = useCallback(
    async (redirectUrl: string) => {
      try {
        const url = new URL(redirectUrl);
        const redemptionLink = url.searchParams.get("redemption_link");

        if (redemptionLink) {
          await WebBrowser.openAuthSessionAsync(
            redemptionLink,
            SUCCESS_REDIRECT_SCHEME,
          );
        }
      } catch (err) {
        console.warn("[WebPaywall] Redemption link error:", err);
      } finally {
        await syncEntitlements();
      }
    },
    [syncEntitlements],
  );

  const openWebPaywall = useCallback(
    async (appUserId: string) => {
      if (!appUserId) {
        setError("User ID not found. Please try again.");
        return;
      }

      try {
        setIsPurchasing(true);
        setError(null);

        const url = getPaywallUrl(appUserId);

        const result = await WebBrowser.openAuthSessionAsync(
          url,
          SUCCESS_REDIRECT_SCHEME,
          {
            preferEphemeralSession: false,
            presentationStyle:
              WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
            toolbarColor: "#0F0F0F",
            showTitle: false,
          },
        );

        if (result.type === "success") {
          await handleRedirectResult(result.url); // handles redemption + sync
        }
      } catch (err: any) {
        setError(err.message ?? "Failed to open paywall");
      } finally {
        setIsPurchasing(false);
      }
    },
    [handleRedirectResult],
  );

  return { openWebPaywall, syncEntitlements, isPurchasing, isLoading, error };
};

export default useWebPaywall;
