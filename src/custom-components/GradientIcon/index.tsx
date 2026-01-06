import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

type GradientIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  gradientColors?: string[];
};

export const GradientMaterialIcon = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}: any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <MaterialIcons name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <MaterialIcons name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};

export const GradientMaterialCommunityIcons = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}: any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <MaterialCommunityIcons name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <MaterialCommunityIcons name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};



export const GradientFeatherIcon = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}:any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <Feather name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Feather name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};


export const GradientIoniconsIcon = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}: any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <Ionicons name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};

export const GradientAntDesignIcon = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}: any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <AntDesign name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <AntDesign name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};


export const GradientEntypoIcon = ({
  name,
  size = 24,
  gradientColors = ["#6B5591", "#9F3E83"],
}: any) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: "transparent" }}>
          <Entypo name={name} size={size} color="white" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Entypo name={name} size={size} color="transparent" />
      </LinearGradient>
    </MaskedView>
  );
};




