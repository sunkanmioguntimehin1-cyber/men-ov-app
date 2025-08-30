import React from "react";
import { View } from "react-native";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxWidthClassName?: string; // allow override
  padded?: boolean;
};

// Provides consistent horizontal padding and max-width for content.
export default function Container({
  children,
  className,
  maxWidthClassName = "max-w-[1200px]",
  padded = true,
}: ContainerProps) {
  return (
    <View className={["w-full items-center", padded ? "px-4 sm:px-6 md:px-8" : undefined, className]
      .filter(Boolean)
      .join(" ")}
    >
      <View className={["w-full", maxWidthClassName].filter(Boolean).join(" ")}>{children}</View>
    </View>
  );
}


