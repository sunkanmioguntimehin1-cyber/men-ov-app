import useAuthStore from "@/src/store/authStore";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import SafeScreen from "../../../components/SafeScreen";

export default function ProfilePage() {
  const router = useRouter();
  const [modelVisible, setModelVisible] = React.useState(false);

  const generalData = [
    {
      img: <Feather name="user" size={24} color="black" />,
      title: "Profile",
      icon: <AntDesign name="right" size={24} color="black" />,
      onPress: () => {
        router.push("/profilepage/profile-screen");
      },
    },
    {
      img: <SimpleLineIcons name="chart" size={24} color="black" />,
      title: "Summary",
      icon: <AntDesign name="right" size={24} color="black" />,
      onPress: () => {
        // router.push("/profilepage/summary-screen");
      },
    },
  ];

  const settingData = [
    {
      img: <MaterialIcons name="notifications-none" size={24} color="black" />,
      title: "Notifications",
      icon: <AntDesign name="right" size={24} color="black" />,
    },
    {
      img: <AntDesign name="user" size={24} color="black" />,
      title: "Contact Us",
      icon: <AntDesign name="right" size={24} color="black" />,
    },
    {
      img: <Feather name="share-2" size={24} color="black" />,
      title: "Share App",
      icon: <AntDesign name="right" size={24} color="black" />,
    },
    {
      img: <MaterialIcons name="delete-outline" size={24} color="red" />,
      title: "Delete Account",
      icon: <AntDesign name="right" size={24} color="black" />,
    },

    {
      img: <MaterialIcons name="logout" size={24} color="black" />,
      title: "Log Out",
      icon: <AntDesign name="right" size={24} color="black" />,
    },
  ];

  const handleRouter = (item: string) => {
    if (item === "Notifications") {
      //  router.push( "/profilepage/profile-screen" );
    } else if (item === "Contact Us") {
      //  router.push({ pathname: "/settings/privacy-policy" });
    } else if (item === "Share App") {
      //  router.push({ pathname: "/settings/about" });
    } else if (item === "Delete Account") {
      //  setModelVisible(true);
    } else if (item === "Log Out") {
      handlelogout();
    }
  };

  const handlelogout = () => {
    Alert.alert("Logout!", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Ok",
        onPress: async () => {
          // Use the auth store's logout method
          useAuthStore.getState().clearAuthState();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const onCancel = () => {
    setModelVisible(false);
  };
  return (
    <SafeScreen className=" p-8">
      <View>
        <View className=" flex-row items-center justify-between">
          <TouchableOpacity>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          <View>
            <Text className=" text-base font-[PoppinsSemiBold]">Profile</Text>
          </View>

          <View />
        </View>
      </View>
      <View className=" my-5">
        <Text className=" font-[PoppinsSemiBold]">General</Text>
        {generalData.map((item, index) => (
          <TouchableOpacity
            key={index}
            className=" my-3 border border-[#ECE3ED] flex-row justify-between items-center p-5 rounded-3xl"
            onPress={item.onPress}
          >
            <View className=" flex-row items-center justify-between">
              <View>{item.img}</View>
              <View className=" mx-5">
                <Text className=" font-[PoppinsRegular]">{item.title}</Text>
              </View>
            </View>

            <View>{item.icon}</View>
          </TouchableOpacity>
        ))}
      </View>

      <View className=" my-5">
        <Text className=" font-[PoppinsSemiBold]">Settings</Text>
        {settingData.map((item, index) => (
          <TouchableOpacity
            key={index}
            className=" my-3 border border-[#ECE3ED] flex-row justify-between items-center p-5 rounded-3xl"
            onPress={() => {
              handleRouter(item.title);
            }}
          >
            <View className=" flex-row items-center justify-between">
              <View>{item.img}</View>
              <View className=" mx-5">
                <Text className=" font-[PoppinsRegular]">{item.title}</Text>
              </View>
            </View>

            <View>{item.icon}</View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeScreen>
  );
}
