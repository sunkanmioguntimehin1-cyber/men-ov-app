// import analytics from "@react-native-firebase/analytics";

// /**
//  * Firebase Analytics Utility Functions
//  * Use these throughout your app to track user behavior
//  */

// // Initialize Analytics (call this in your _layout.tsx)
// export const initializeAnalytics = async () => {
//   try {
//     await analytics().setAnalyticsCollectionEnabled(true);
//     console.log("Firebase Analytics initialized");
//   } catch (error) {
//     console.error("Failed to initialize Firebase Analytics:", error);
//   }
// };

// const screenNameMap: Record<string, string> = {
//   "/": "Home",
//   "/(tabs)": "Home",
//   "/(tabs)/explore": "Explore",
//   "/(tabs)/community": "Community",
//   "/(tabs)/profile": "Profile",
//   "/(auth)/login": "Login",
//   "/(auth)/registration": "Registration",
// };

// // // Log screen views
// export const logScreenView2 = async (
//   screenName: string,
//   screenClass?: string,
// ) => {
//   try {
//     await analytics().logScreenView({
//       screen_name: screenName,
//       screen_class: screenClass || screenName,
//     });
//   } catch (error) {
//     console.error("Error logging screen view:", error);
//   }
// };

// export const logScreenView = async (pathname: string) => {
//   try {
//     // Look up the friendly name, fallback to the raw pathname if not found
//     const friendlyName = screenNameMap[pathname] || pathname;

//     await analytics().logScreenView({
//       screen_name: friendlyName,
//       screen_class: friendlyName,
//     });
//     console.log(`Analytics: Tracked screen as "${friendlyName}"`);
//   } catch (error) {
//     console.error("Error logging screen view:", error);
//   }
// };

// // Log custom events
// export const logEvent = async (
//   eventName: string,
//   params?: { [key: string]: any },
// ) => {
//   try {
//     await analytics().logEvent(eventName, params);
//   } catch (error) {
//     console.error("Error logging event:", error);
//   }
// };

// // Log user login
// export const logLogin = async (method: string) => {
//   try {
//     await analytics().logLogin({ method });
//   } catch (error) {
//     console.error("Error logging login:", error);
//   }
// };

// // Log user signup
// export const logSignUp = async (method: string) => {
//   try {
//     await analytics().logSignUp({ method });
//   } catch (error) {
//     console.error("Error logging signup:", error);
//   }
// };

// // Set user ID
// export const setUserId = async (userId: string) => {
//   try {
//     await analytics().setUserId(userId);
//   } catch (error) {
//     console.error("Error setting user ID:", error);
//   }
// };

// // Set user properties
// export const setUserProperties = async (properties: {
//   [key: string]: string;
// }) => {
//   try {
//     await analytics().setUserProperties(properties);
//   } catch (error) {
//     console.error("Error setting user properties:", error);
//   }
// };

// // Log app open
// export const logAppOpen = async () => {
//   try {
//     await analytics().logAppOpen();
//   } catch (error) {
//     console.error("Error logging app open:", error);
//   }
// };

// // Menovia-specific analytics events
// export const MenoviaAnalytics = {
//   // Symptom tracking
//   logSymptomTracked: (symptomType: string, severity: number) =>
//     logEvent("symptom_tracked", { symptom_type: symptomType, severity }),

//   // Cycle tracking
//   logCycleTracked: (stage: string) => logEvent("cycle_tracked", { stage }),

//   // AI Chat
//   logAIChatMessage: (messageType: "user" | "ai") =>
//     logEvent("ai_chat_message", { type: messageType }),

//   // Community
//   logPostCreated: (isAnonymous: boolean) =>
//     logEvent("community_post_created", { is_anonymous: isAnonymous }),

//   logPostLiked: () => logEvent("community_post_liked"),

//   logCommentAdded: () => logEvent("community_comment_added"),

//   // Content engagement
//   logArticleViewed: (articleId: string, title: string) =>
//     logEvent("article_viewed", { article_id: articleId, title }),

//   // Profile
//   logProfileUpdated: () => logEvent("profile_updated"),

//   logIntakeCompleted: () => logEvent("intake_completed"),

//   // Notifications
//   logNotificationOpened: (type: string) =>
//     logEvent("notification_opened", { notification_type: type }),
// };

// export default analytics;

import analytics from "@react-native-firebase/analytics";
import { Platform } from "react-native";

/**
 * Initialize Firebase Analytics
 */
export const initializeAnalytics = async () => {
  try {
    await analytics().setAnalyticsCollectionEnabled(true);
    console.log("✅ Firebase Analytics initialized");
  } catch (error) {
    console.error("❌ Error initializing analytics:", error);
  }
};

/**
 * Map of route paths to friendly screen names
 */
const screenNameMap: Record<string, string> = {
  "/": "Home",
  "/(tabs)": "Home",
  "/(tabs)/homepage": "Home",
  "/homepage": "Home",

  "/(tabs)/explorepage": "Learn",
  "/explorepage": "Learn",

  "/(tabs)/communitypage": "Community",
  "/communitypage": "Community",

  "/(tabs)/summarypage": "Insights,",
  "/summarypage": "Insights,",

  "/(auth)/login": "Login",
  "/login": "Login",

  "/(auth)/sign-up": "Sign Up",
  "/sign-up": "Sign Up",
  "/signup": "Sign Up",

  // Add more routes as needed
  "/settings": "Settings",
  "/homepage/notifications-screen": "Notifications",
  "/homepage/chat-with-ai": "Ziena_Chat",
  "/chat-with-ai": "Ziena_Chat",
};

/**
 * Log screen view with friendly name
 */
export const logScreenView = async (pathname: string) => {
  try {
    // Look up the friendly name, fallback to cleaned pathname if not found
    const friendlyName = screenNameMap[pathname] || cleanPathname(pathname);

    await analytics().logScreenView({
      screen_name: friendlyName,
      screen_class: friendlyName,
    });

    console.log(`📊 Analytics: Tracked screen as "${friendlyName}"`);
  } catch (error) {
    console.error("❌ Error logging screen view:", error);
  }
};

/**
 * Clean pathname to make it more readable
 */
function cleanPathname(pathname: string): string {
  return (
    pathname
      .replace(/^\/|\/$/g, "") // Remove leading/trailing slashes
      .replace(/\//g, "_") // Replace slashes with underscores
      .replace(/[()]/g, "") || // Remove parentheses
    "Unknown"
  );
}

/**
 * Log app open event
 */
export const logAppOpen = async () => {
  try {
    await analytics().logEvent("app_open", {
      platform: Platform.OS,
      timestamp: Date.now(),
    });
    console.log("📊 Analytics: App opened");
  } catch (error) {
    console.error("❌ Error logging app open:", error);
  }
};

/**
 * Log custom event
 */
export const logEvent = async (
  eventName: string,
  params?: Record<string, any>,
) => {
  try {
    await analytics().logEvent(eventName, params);
    console.log(`📊 Analytics: Event "${eventName}"`, params);
  } catch (error) {
    console.error(`❌ Error logging event "${eventName}":`, error);
  }
};

/**
 * Log login event
 */
export const logLogin = async (method: string = "email") => {
  try {
    await analytics().logLogin({ method });
    console.log(`📊 Analytics: User logged in with ${method}`);
  } catch (error) {
    console.error("❌ Error logging login:", error);
  }
};

/**
 * Log sign up event
 */
export const logSignUp = async (method: string = "email") => {
  try {
    await analytics().logSignUp({ method });
    console.log(`📊 Analytics: User signed up with ${method}`);
  } catch (error) {
    console.error("❌ Error logging sign up:", error);
  }
};

/**
 * Set user ID for analytics
 */
export const setUserId = async (userId: string) => {
  try {
    await analytics().setUserId(userId);
    console.log(`📊 Analytics: User ID set to ${userId}`);
  } catch (error) {
    console.error("❌ Error setting user ID:", error);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = async (properties: Record<string, string>) => {
  try {
    await analytics().setUserProperties(properties);
    console.log("📊 Analytics: User properties set", properties);
  } catch (error) {
    console.error("❌ Error setting user properties:", error);
  }
};

/**
 * Menovia-specific analytics events
 */
export const MenoviaAnalytics = {
  /**
   * Track symptom logging
   */
  logSymptomTracked: async (symptom: string, severity?: string) => {
    await logEvent("symptom_tracked", {
      symptom_type: symptom,
      severity: severity || "not_specified",
      timestamp: Date.now(),
    });
  },

  /**
   * Track cycle logging
   */
  logCycleTracked: async (cycleDay: number, flow?: string) => {
    await logEvent("cycle_tracked", {
      cycle_day: cycleDay,
      flow_intensity: flow || "not_specified",
      timestamp: Date.now(),
    });
  },

  /**
   * Track AI chat message
   */
  logAIChatMessage: async (messageLength: number) => {
    await logEvent("ai_chat_message", {
      message_length: messageLength,
      timestamp: Date.now(),
    });
  },

  /**
   * Track community post creation
   */
  logPostCreated: async (postType: string = "text") => {
    await logEvent("post_created", {
      post_type: postType,
      timestamp: Date.now(),
    });
  },

  /**
   * Track post like
   */
  logPostLiked: async (postId: string) => {
    await logEvent("post_liked", {
      post_id: postId,
      timestamp: Date.now(),
    });
  },

  /**
   * Track comment added
   */
  logCommentAdded: async (postId: string) => {
    await logEvent("comment_added", {
      post_id: postId,
      timestamp: Date.now(),
    });
  },

  /**
   * Track article view
   */
  logArticleViewed: async (articleId: string, articleTitle: string) => {
    await logEvent("article_viewed", {
      article_id: articleId,
      article_title: articleTitle,
      timestamp: Date.now(),
    });
  },

  /**
   * Track profile update
   */
  logProfileUpdated: async (updateType: string) => {
    await logEvent("profile_updated", {
      update_type: updateType,
      timestamp: Date.now(),
    });
  },

  /**
   * Track intake form completion
   */
  logIntakeCompleted: async () => {
    await logEvent("intake_completed", {
      timestamp: Date.now(),
    });
  },

  /**
   * Track notification opened
   */
  logNotificationOpened: async (notificationType: string) => {
    await logEvent("notification_opened", {
      notification_type: notificationType,
      timestamp: Date.now(),
    });
  },
};
