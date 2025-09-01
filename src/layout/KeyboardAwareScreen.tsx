import React from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardToolbar } from "react-native-keyboard-controller";
import type { Edge } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

type KeyboardAwareScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  scroll?: boolean;
  keyboardAware?: boolean;
  className?: string;
  contentClassName?: string;
  extraScrollHeight?: number;
  enableOnAndroid?: boolean;
};

export default function KeyboardAwareScreen({
  children,
  edges = ["top", "left", "right"],
  scroll = false,
  keyboardAware = false,
  className,
  contentClassName,
  extraScrollHeight = 20,
  enableOnAndroid = true,
}: KeyboardAwareScreenProps) {
  if (scroll && keyboardAware) {
    return (
      <SafeScreen
        edges={edges}
        className={["bg-background", className].filter(Boolean).join(" ")}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        //   extraScrollHeight={extraScrollHeight}
        //   enableOnAndroid={enableOnAndroid}
          bounces={false}
        >
          <View
            className={["flex-grow", contentClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </View>
        </KeyboardAwareScrollView>
        <KeyboardToolbar />
      </SafeScreen>
    );
  }

  if (scroll) {
    return (
      <SafeScreen
        edges={edges}
        className={["bg-background", className].filter(Boolean).join(" ")}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={["flex-grow", contentClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {children}
          </View>
        </ScrollView>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen
      edges={edges}
      className={["bg-background", className].filter(Boolean).join(" ")}
    >
      <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>
        {children}
      </View>
    </SafeScreen>
  );
}
