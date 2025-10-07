import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';

const FloatingAiButton = () => {
  const router=useRouter()
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim, pulseAnim]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const glowScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.28, 0.08],
  });

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
      >
        <View style={{ position: "relative" }}>
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: -6,
              right: -6,
              top: -6,
              bottom: -6,
              borderRadius: 18,
              backgroundColor: "rgba(138,63,252,0.25)",
              opacity: glowOpacity as unknown as number,
              transform: [{ scale: glowScale as unknown as number }],
            }}
          />
          <TouchableOpacity
            accessibilityLabel="Open AI assistant"
            activeOpacity={0.9}
            className=" w-full  bg-white my-3 border border-[#EAEAEA] p-4 rounded-2xl"
            style={{
              shadowColor: "#8A3FFC",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
          >
            <Text className=" text-[#101828] font-[PoppinsSemiBold] text-base">
              AI-Powered Tool
            </Text>

       
            <View className="flex-row items-center justify-between">
              
              <AntDesign name="adduser" size={26} color="#8A3FFC" />

             
              <View className="flex-1 mx-3 bg-[#F4EBFF] border border-[#EAECF0] p-4 rounded-lg">
                <Text className="text-base font-[PoppinsRegular]">
                  Ask about your menopausal symptoms
                </Text>
              </View>

              {/* Send button */}
              <TouchableOpacity
                onPress={() => {
                  router.push("/(tabs)/homepage/chat-with-ai");
                }}
              >
                <MaterialIcons name="send" size={26} color="#8A3FFC" />
              </TouchableOpacity>
            </View>

            <View className=" my-2">
              <Text>We care about your data in our privacy policy.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

export default FloatingAiButton




