import { useDeleteUserApi } from "@/src/api_services/userApi/userMutation";
import { useGetIntakeDetails } from "@/src/api_services/userApi/userQuery";
import AccountDeletionModal from "@/src/components/profile/AccountDeletionModal";
import SafeScreen from "@/src/components/SafeScreen";
import CustomModel from "@/src/custom-components/CustomModel";
import useAuthStore from "@/src/store/authStore";
import useSymtomsStore from "@/src/store/symtomsStore";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  const deleteUserDetails = useDeleteUserApi();
  const getIntakeDetails = useGetIntakeDetails();

  console.log("getIntakeDetailsError6000", !getIntakeDetails.data);
  const [modelVisible, setModelVisible] = React.useState(false);
  const [modelVisible1, setModelVisible1] = React.useState(false);

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
        router.push("/profilepage/summary-screen");
      },
    },
  ];

  const settingData = [
    {
      img: <MaterialIcons name="notifications-none" size={24} color="black" />,
      title: "Notifications",
      icon: <AntDesign name="right" size={24} color="black" />,
    },
    // {
    //   img: <AntDesign name="user" size={24} color="black" />,
    //   title: "Contact Us",
    //   icon: <AntDesign name="right" size={24} color="black" />,
    // },
    // {
    //   img: <Feather name="share-2" size={24} color="black" />,
    //   title: "Share App",
    //   icon: <AntDesign name="right" size={24} color="black" />,
    // },
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
      router.push("/profilepage/notifications");
    } else if (item === "Contact Us") {
      //  router.push({ pathname: "/settings/privacy-policy" });
    } else if (item === "Share App") {
      //  router.push({ pathname: "/settings/about" });
    } else if (item === "Delete Account") {
      setModelVisible(true);
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
          // Clear all cached data and auth state
          useAuthStore.getState().clearAuthState(queryClient);
          useSymtomsStore.getState().clearAllData();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const onDelete = () => {
    deleteUserDetails.mutate();
    setModelVisible(false);
  };

  const onCancel = () => {
    setModelVisible(false);
  };

  // //USEFOCUSEFFECT
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (firstTimeRef.current) {
  //       firstTimeRef.current = false;
  //       return;
  //     }

  //     if (!getIntakeDetails.data) {
  //       setModelVisible1(true);
  //     }

  //     // getIntakeDetails.refetch();
  //   }, [getIntakeDetails])
  // );

  // Open intake modal when query resolves and there's no data
  // React.useEffect(() => {
  //   if (!getIntakeDetails.data) {
  //     setModelVisible1(true);
  //   }
  // }, [getIntakeDetails.data]);

  const onCancel2 = () => {
    setModelVisible1(false);
  };
  return (
     <SafeScreen className=" p-8">
     
       
          <CustomModel
            modelVisible={modelVisible}
            setModelVisible={setModelVisible}
            message={
              <AccountDeletionModal onDelete={onDelete} onCancel={onCancel} />
            }
          />
          {/* <CustomModel
        modelVisible={modelVisible1}
        setModelVisible={setModelVisible1}
        closeOnOutsideClick={false}
        message={<InTakeModal onCancel={onCancel2} />}
      /> */}
          <View>
            <View className=" flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>

              <View>
                <Text className=" text-base font-[PoppinsSemiBold]">
                  Profile
                </Text>
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
