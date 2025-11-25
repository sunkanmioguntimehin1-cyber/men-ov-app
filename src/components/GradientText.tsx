// components/GradientText.tsx
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextProps } from "react-native";

type GradientTextProps = TextProps & {
  children: React.ReactNode;
  gradientColors?: string[];
};

export const GradientText = ({
  children,
  gradientColors = ["#5B4591", "#B33288"],
  className,
  style,
  ...props
}: any) => {
  return (
    <MaskedView
      maskElement={
        <Text className={className} style={style} {...props}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className={className} style={[style, { opacity: 0 }]} {...props}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};
