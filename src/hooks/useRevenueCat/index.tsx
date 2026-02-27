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

// const useRevenueCat = () => {
//   const [currentOffering, setCurrentOffering] =
//     React.useState<PurchasesOffering | null>(null);
//   const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo | null>(
//     null,
//   );

//   const isProMember = customerInfo?.entitlements.active.pro;

//   // const isProMember =
//   //   customerInfo?.activeSubscriptions.includes(
//   //     typeOfMembership.premium_monthly,
//   //   ) ||
//   //   customerInfo?.activeSubscriptions.includes(typeOfMembership.premium_yearly);

//   useEffect(() => {
//     Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
//     if (apiKey) {
//       Purchases.configure({ apiKey });
//     }
//     getCustomerInfo();
//     getOfferings();
//   }, []);

//   useEffect(() => {
//     Purchases.addCustomerInfoUpdateListener((info) => {
//       setCustomerInfo(info);
//     });
//   }, []);

//   async function getCustomerInfo() {
//     const info = await Purchases.getCustomerInfo();
//     setCustomerInfo(info);
//   }

//   async function getOfferings() {
//     const offerings = await Purchases.getOfferings();
//     if (
//       offerings.current !== null &&
//       offerings.current.availablePackages.length !== 0
//     ) {
//       setCurrentOffering(offerings.current);
//     }
//   }

//   return { currentOffering, customerInfo, isProMember };
// };

const useRevenueCat = () => {
  const [currentOffering, setCurrentOffering] =
    React.useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo | null>(
    null,
  );

  const isProMember = !!customerInfo?.entitlements.active.pro;

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
