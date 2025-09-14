import React from "react";
import { View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

type SafeScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  contentClassName?: string;
};

export default function SafeScreen({
  children,
  edges = ["top", "left", "right"],
  className,
  contentClassName,
}: SafeScreenProps) {
  return (
    <SafeAreaView
      className={["flex-1", className].filter(Boolean).join(" ")}
      edges={edges}
    >
      <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>
        {children}
      </View>
    </SafeAreaView>
  );
}
