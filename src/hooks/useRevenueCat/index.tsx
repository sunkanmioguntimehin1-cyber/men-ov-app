import React, { useEffect } from "react";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
} from "react-native-purchases";

const apiKey = Platform.select({
  ios: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_KEY,
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
});

const typeOfMembership = {
  premium_monthly: "premium_monthly",
  premium_yearly: "premium_yearly",
};

const useRevenueCat = () => {
  const [currentOffering, setCurrentOffering] =
    React.useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo | null>(
    null,
  );

  // const isProMember = !!customerInfo?.entitlements.active.pro;
  // const isProMember = customerInfo?.entitlements.active.pro;
  // inside useRevenueCat hook
  const isProMember = customerInfo?.entitlements?.active?.pro !== undefined;

  // Add these two new derived states
  const isCancelled =
    customerInfo?.activeSubscriptions.length === 0 && // no active sub
    !customerInfo?.entitlements.active.pro; // no entitlement either = fully expired

  const isPendingCancellation =
    !!customerInfo?.entitlements.active.pro && // still has access
    customerInfo?.activeSubscriptions.length === 0; // but no auto-renew = cancelled but not expired yet

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (apiKey) Purchases.configure({ apiKey });
    getCustomerInfo();
    getOfferings();
  }, []);

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener((info) => {
      setCustomerInfo(info);
    });
  }, []);

  async function getCustomerInfo() {
    const info = await Purchases.getCustomerInfo();
    setCustomerInfo(info);
  }

  async function getOfferings() {
    const offerings = await Purchases.getOfferings();
    if (
      offerings.current !== null &&
      offerings.current.availablePackages.length !== 0
    ) {
      setCurrentOffering(offerings.current);
    }
  }

  return {
    currentOffering,
    customerInfo,
    isProMember,
    isCancelled,
    isPendingCancellation,
  };
};

export default useRevenueCat;

// import { useCallback, useEffect, useState } from "react";

// const ENTITLEMENT_ID = "pro app"; // ✅ matches your dashboard exactly
// const RC_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY; // or a shared key

// const useRevenueCat = (userId?: string) => {
//   const [customerInfo, setCustomerInfo] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Directly hit RevenueCat REST API — works perfectly for web billing
//   const fetchCustomerInfo = useCallback(async () => {
//     if (!userId) return null;

//     try {
//       setIsLoading(true);

//       const response = await fetch(
//         `https://api.revenuecat.com/v1/subscribers/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer rcb_sb_qlpmNCqoRApkoLcFTknMLFbWD`,
//             "Content-Type": "application/json",
//             "X-Platform": "android", // or 'ios'
//           },
//         },
//       );

//       const data = await response.json();
//       setCustomerInfo(data.subscriber);
//       return data.subscriber;
//     } catch (err) {
//       console.error("[RevenueCat REST] fetchCustomerInfo error:", err);
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!userId) return;
//     fetchCustomerInfo();
//   }, [userId]);

//   // ✅ Check entitlement from REST response
//   const isProMember = (() => {
//     if (!customerInfo) return false;
//     const entitlement = customerInfo?.entitlements?.[ENTITLEMENT_ID];
//     if (!entitlement) return false;

//     // Check expiration — web billing sets expires_date
//     const expiresDate = entitlement.expires_date;
//     if (!expiresDate) return true; // lifetime
//     return new Date(expiresDate) > new Date(); // still active?
//   })();

//   const isCancelled =
//     !isProMember && !!customerInfo?.entitlements?.[ENTITLEMENT_ID]; // had it but expired

//   const isPendingCancellation = (() => {
//     if (!isProMember) return false;
//     const entitlement = customerInfo?.entitlements?.[ENTITLEMENT_ID];
//     const productId = entitlement?.product_identifier;
//     const sub = customerInfo?.subscriptions?.[productId];
//     return sub?.unsubscribe_detected_at !== null; // cancelled but not expired
//   })();

//   return {
//     customerInfo,
//     isProMember,
//     isCancelled,
//     isPendingCancellation,
//     isLoading,
//     fetchCustomerInfo, // ← call this after web purchase to refresh
//   };
// };

// export default useRevenueCat;

// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useEffect, useState } from "react";

// const ENTITLEMENT_ID = "pro";
// const RC_SECRET_KEY = process.env.EXPO_PUBLIC_REVENUECAT_SECRET_KEY;

// const useRevenueCat = (userId?: string) => {
//   const [customerInfo, setCustomerInfo] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ 1. READ — REST API v1 (get subscriber + management_url)
//   const fetchCustomerInfo = useCallback(async () => {
//     if (!userId) return null;
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `https://api.revenuecat.com/v1/subscribers/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${RC_SECRET_KEY}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       const data = await response.json();
//       setCustomerInfo(data.subscriber);
//       return data.subscriber;
//     } catch (err) {
//       console.error("[RC REST] fetchCustomerInfo error:", err);
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   // ✅ 2. MANAGE/CANCEL — open management_url in browser
//   // RevenueCat's customer portal lets them cancel, see invoices, update payment
//   const openManagementPortal = useCallback(async () => {
//     // ✅ Get management_url from inside the subscription object
//     const subscriptions = customerInfo?.subscriptions ?? {};
//     const managementUrl = Object.values(subscriptions)
//       .map((sub: any) => sub.management_url)
//       .find(Boolean); // grab first non-null one

//     if (!managementUrl) {
//       console.warn("[RC] No management_url found");
//       return;
//     }

//     await WebBrowser.openBrowserAsync(managementUrl, {
//       presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
//       toolbarColor: "#0F0F0F",
//     });

//     await fetchCustomerInfo();
//   }, [customerInfo, fetchCustomerInfo]);

//   // ✅ 3. RESTORE — for web billing, just re-fetch by userId (no store receipt needed)
//   const restoreSubscription = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const info = await fetchCustomerInfo();
//       return info;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [fetchCustomerInfo]);

//   useEffect(() => {
//     if (!userId) return;
//     fetchCustomerInfo();
//   }, [userId]);

//   // ✅ Derive status from REST data
//   const isProMember = (() => {
//     if (!customerInfo) return false;
//     const entitlement = customerInfo?.entitlements?.[ENTITLEMENT_ID];
//     if (!entitlement) return false;
//     const expiresDate = entitlement.expires_date;
//     if (!expiresDate) return true;
//     return new Date(expiresDate) > new Date();
//   })();

//   const isPendingCancellation = (() => {
//     if (!isProMember) return false;
//     const entitlement = customerInfo?.entitlements?.[ENTITLEMENT_ID];
//     const productId = entitlement?.product_identifier;
//     const sub = customerInfo?.subscriptions?.[productId];
//     return !!sub?.unsubscribe_detected_at;
//   })();

//   const isCancelled =
//     !isProMember && !!customerInfo?.entitlements?.[ENTITLEMENT_ID];

//   return {
//     customerInfo,
//     isProMember,
//     isCancelled,
//     isPendingCancellation,
//     isLoading,
//     fetchCustomerInfo,
//     openManagementPortal, // ← handles cancel + everything else
//     restoreSubscription,
//   };
// };

// export default useRevenueCat;
