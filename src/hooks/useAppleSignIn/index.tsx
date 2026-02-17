import { logLogin, setUserId, setUserProperties } from "@/src/lib/analytics";
import * as AppleAuthentication from "expo-apple-authentication";
import { useState } from "react";
import { Platform } from "react-native";

interface AppleSignInResult {
  success: boolean;
  user?: {
    id: string;
    email: string | null;
    fullName?: {
      givenName: string | null;
      familyName: string | null;
    };
    identityToken: string;
    authorizationCode: string;
  };
  error?: string;
}

export function useAppleSignIn() {
  const [loading, setLoading] = useState(false);

  const signInWithApple = async (): Promise<AppleSignInResult> => {
    // Check if Apple Sign-In is available
    if (Platform.OS !== "ios") {
      return {
        success: false,
        error: "Apple Sign-In is only available on iOS devices",
      };
    }

    try {
      setLoading(true);

      // Check if Apple Authentication is available on this device
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        return {
          success: false,
          error: "Apple Sign-In is not available on this device",
        };
      }

      // Request Apple Sign-In
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Extract user data
      const user = {
        id: credential.user,
        email: credential.email,
        fullName: credential.fullName
          ? {
              givenName: credential.fullName.givenName,
              familyName: credential.fullName.familyName,
            }
          : undefined,
        identityToken: credential.identityToken || "",
        authorizationCode: credential.authorizationCode || "",
      };

      // Log analytics
      await logLogin("apple");
      await setUserId(user.id);
      await setUserProperties({
        sign_in_method: "apple",
        has_email: user.email ? "true" : "false",
      });

      console.log("✅ Apple Sign-In successful:", user.id);

      return {
        success: true,
        user,
      };
    } catch (error: any) {
      console.error("❌ Apple Sign-In error:", error);

      let errorMessage = "Failed to sign in with Apple";

      if (error.code === "ERR_CANCELED") {
        errorMessage = "Sign-in was canceled";
      } else if (error.code === "ERR_INVALID_RESPONSE") {
        errorMessage = "Invalid response from Apple";
      } else if (error.code === "ERR_REQUEST_FAILED") {
        errorMessage = "Sign-in request failed";
      }

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithApple,
    loading,
  };
}
