import React from "react";
import { ScrollView, View } from "react-native";
import type { Edge } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
};

export default function Screen({
  children,
  edges = ["top", "left", "right"],
  scroll = false,
  className,
  contentClassName,
}: ScreenProps) {
  if (scroll) {
    return (
      <SafeScreen edges={edges} className={["bg-background", className].filter(Boolean).join(" ")}>
        <ScrollView className="flex-1" contentContainerClassName={["flex-grow", contentClassName].filter(Boolean).join(" ")}> 
          {children}
        </ScrollView>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen edges={edges} className={["bg-background", className].filter(Boolean).join(" ")}>
      <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>{children}</View>
    </SafeScreen>
  );
}


