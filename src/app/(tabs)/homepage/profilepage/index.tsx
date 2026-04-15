// import { useDeleteUserApi } from "@/src/api_services/userApi/userMutation";
// import {
//   useGetIntakeDetails,
//   useGetUser,
// } from "@/src/api_services/userApi/userQuery";
// import AccountDeletionModal from "@/src/components/profile/AccountDeletionModal";
// import SafeScreen from "@/src/components/SafeScreen";
// import CustomModel from "@/src/custom-components/CustomModel";
// import useRevenueCat from "@/src/hooks/useRevenueCat";
// import useAuthStore from "@/src/store/authStore";
// import useSymtomsStore from "@/src/store/symtomsStore";
// import {
//   AntDesign,
//   Feather,
//   MaterialIcons,
//   Octicons,
// } from "@expo/vector-icons";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Alert, Text, TouchableOpacity, View } from "react-native";

// export default function ProfilePage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const getUserData = useGetUser();
//   const userId = getUserData?.data?.id;
//   const { isProMember } = useRevenueCat();

//   const firstTimeRef = React.useRef(true);

//   const deleteUserDetails = useDeleteUserApi();
//   const getIntakeDetails = useGetIntakeDetails();

//   const [modelVisible, setModelVisible] = React.useState(false);
//   const [modelVisible1, setModelVisible1] = React.useState(false);

//   const generalData = [
//     {
//       img: <Feather name="user" size={24} color="black" />,
//       title: "Profile",
//       icon: <AntDesign name="right" size={24} color="black" />,
//       onPress: () => {
//         router.push("/homepage/profilepage/profile-screen");
//       },
//     },
//     // {
//     //   img: <SimpleLineIcons name="chart" size={24} color="black" />,
//     //   title: "Summary",
//     //   icon: <AntDesign name="right" size={24} color="black" />,
//     //   onPress: () => {
//     //     router.push("/homepage/profilepage/summary-screen");
//     //   },
//     // },
//   ];

//   const settingData = [
//     {
//       img: <MaterialIcons name="notifications-none" size={24} color="black" />,
//       title: "Notifications",
//       icon: <AntDesign name="right" size={24} color="black" />,
//     },
//     {
//       img: <AntDesign name="user" size={24} color="black" />,
//       title: "Contact Us",
//       icon: <AntDesign name="right" size={24} color="black" />,
//     },
//     // {
//     //   img: <Feather name="share-2" size={24} color="black" />,
//     //   title: "Share App",
//     //   icon: <AntDesign name="right" size={24} color="black" />,
//     // },
//     {
//       img: <Octicons name="megaphone" size={24} color="black" />,
//       title: isProMember ? "Manage Subscription" : "Upgrade your plan",
//       // title: "Upgrade your plan",
//       icon: <AntDesign name="right" size={24} color="black" />,
//     },
//     {
//       img: <MaterialIcons name="delete-outline" size={24} color="red" />,
//       title: "Delete Account",
//       icon: <AntDesign name="right" size={24} color="black" />,
//     },

//     {
//       img: <MaterialIcons name="logout" size={24} color="black" />,
//       title: "Log Out",
//       icon: <AntDesign name="right" size={24} color="black" />,
//     },
//   ];

//   const handleRouter = async (item: string) => {
//     if (item === "Notifications") {
//       router.push("/homepage/profilepage/notifications");
//     } else if (item === "Contact Us") {
//       router.push("/homepage/profilepage/contact-us");
//     } else if (item === "Upgrade your plan") {
//       router.push("/homepage/profilepage/paywall-screen");
//     } else if (item === "Manage Subscription") {
//       router.push("/homepage/manage-subscription");
//     } else if (item === "Share App") {
//       //  router.push({ pathname: "/settings/about" });
//     } else if (item === "Delete Account") {
//       setModelVisible(true);
//     } else if (item === "Log Out") {
//       handlelogout();
//     }
//   };

//   const handlelogout = () => {
//     Alert.alert("Logout!", "Are you sure you want to logout?", [
//       {
//         text: "Cancel",
//         onPress: () => {},
//       },
//       {
//         text: "Ok",
//         onPress: async () => {
//           // Clear all cached data and auth state
//           await GoogleSignin.signOut();
//           useAuthStore.getState().clearAuthState(queryClient);
//           useSymtomsStore.getState().clearAllData();
//           router.replace("/(auth)/login");
//         },
//       },
//     ]);
//   };

//   const onDelete = () => {
//     deleteUserDetails.mutate();
//     setModelVisible(false);
//   };

//   const onCancel = () => {
//     setModelVisible(false);
//   };

//   const onCancel2 = () => {
//     setModelVisible1(false);
//   };
//   return (
//     <SafeScreen className=" p-8">
//       <CustomModel
//         modelVisible={modelVisible}
//         setModelVisible={setModelVisible}
//         message={
//           <AccountDeletionModal onDelete={onDelete} onCancel={onCancel} />
//         }
//       />

//       <View>
//         <View className=" flex-row items-center justify-between">
//           <TouchableOpacity
//             onPress={() => {
//               router.back();
//             }}
//           >
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>

//           <View>
//             <Text className=" text-base font-[PoppinsSemiBold]">Profile</Text>
//           </View>

//           <View />
//         </View>
//       </View>
//       <View className=" my-5">
//         <Text className=" font-[PoppinsSemiBold]">General</Text>
//         {generalData.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             className=" my-3 border border-[#ECE3ED] flex-row justify-between items-center p-5 rounded-3xl"
//             onPress={item.onPress}
//           >
//             <View className=" flex-row items-center justify-between">
//               <View>{item.img}</View>
//               <View className=" mx-5">
//                 <Text className=" font-[PoppinsRegular]">{item.title}</Text>
//               </View>
//             </View>

//             <View>{item.icon}</View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View className=" my-5">
//         <Text className=" font-[PoppinsSemiBold]">Settings</Text>
//         {settingData.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             className=" my-3 border border-[#ECE3ED] flex-row justify-between items-center p-5 rounded-3xl"
//             onPress={() => {
//               handleRouter(item.title);
//             }}
//           >
//             <View className=" flex-row items-center justify-between">
//               <View>{item.img}</View>
//               <View className=" mx-5">
//                 <Text className=" font-[PoppinsRegular]">{item.title}</Text>
//               </View>
//             </View>

//             <View>{item.icon}</View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeScreen>
//   );
// }

import { usePaymentSyncApi } from "@/src/api_services/payment/paymentMutation";
import { useDeleteUserApi } from "@/src/api_services/userApi/userMutation";
import {
  useGetIntakeDetails,
  useGetUser,
} from "@/src/api_services/userApi/userQuery";
import AccountDeletionModal from "@/src/components/profile/AccountDeletionModal";
import SafeScreen from "@/src/components/SafeScreen";
import CustomModel from "@/src/custom-components/CustomModel";
import useRevenueCat from "@/src/hooks/useRevenueCat";
import useWebPaywall from "@/src/hooks/useWebPaywall";
import useAuthStore from "@/src/store/authStore";
import useSymtomsStore from "@/src/store/symtomsStore";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const getUserData = useGetUser();
  const userId = getUserData?.data?.id;
  const paymentSync = usePaymentSyncApi(); // Add this line to use the mutation

  const {
    isProMember,
    openManagementPortal,
    restoreSubscription,
    fetchCustomerInfo,
    customerInfo,
  } = useRevenueCat(userId);

  // ✅ No onSuccess callback needed here anymore
  const { openWebPaywall } = useWebPaywall(fetchCustomerInfo);

  // ✅ Single source of truth for post-purchase navigation
  const wasProMember = React.useRef<boolean | null>(null);

  console.log("customerInfo", customerInfo);

  const hasNavigated = React.useRef(false);

  useEffect(() => {
    // ✅ don't do anything until customerInfo has actually loaded
    if (customerInfo === null) return;

    // first time customerInfo is available — set baseline, no navigation
    if (wasProMember.current === null) {
      wasProMember.current = isProMember;
      return;
    }

    // only navigate if it JUST changed false → true
    if (!wasProMember.current && isProMember) {
      paymentSync.mutate({
        customerId: customerInfo?.original_app_user_id || userId || "unknown",
      });
      router.push("/(tabs)/homepage/welcome-plus");
    }

    wasProMember.current = isProMember;
  }, [isProMember, customerInfo]);

  console.log(
    "🚀 ~ file: index.tsx:24 ~ ProfilePage ~ isProMember:",
    isProMember,
  );

  console.log(
    "🚀 ~ file: index.tsx:24 ~ ProfilePage ~ customerInfo:",
    customerInfo,
  );

  const firstTimeRef = React.useRef(true);

  const deleteUserDetails = useDeleteUserApi();
  const getIntakeDetails = useGetIntakeDetails();

  const [modelVisible, setModelVisible] = React.useState(false);
  const [modelVisible1, setModelVisible1] = React.useState(false);

  const generalData = [
    {
      img: <Feather name="user" size={24} color="black" />,
      title: "Profile",
      icon: <AntDesign name="right" size={24} color="black" />,
      onPress: () => {
        router.push("/homepage/profilepage/profile-screen");
      },
    },
    // {
    //   img: <SimpleLineIcons name="chart" size={24} color="black" />,
    //   title: "Summary",
    //   icon: <AntDesign name="right" size={24} color="black" />,
    //   onPress: () => {
    //     router.push("/homepage/profilepage/summary-screen");
    //   },
    // },
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
    // {
    //   img: <Feather name="share-2" size={24} color="black" />,
    //   title: "Share App",
    //   icon: <AntDesign name="right" size={24} color="black" />,
    // },
    {
      img: <Octicons name="megaphone" size={24} color="black" />,
      title: isProMember ? "Manage Subscription" : "Upgrade your plan",
      // title: "Upgrade your plan",
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

  const handleRouter = async (item: string) => {
    if (item === "Notifications") {
      router.push("/homepage/profilepage/notifications");
    } else if (item === "Contact Us") {
      router.push("/homepage/profilepage/contact-us");
    } else if (item === "Upgrade your plan") {
      const userId = getUserData?.data?.id;
      if (!userId) return;
      await openWebPaywall(userId);
    } else if (item === "Manage Subscription") {
      router.push("/homepage/manage-subscription");
      // await openManagementPortal();
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
          await GoogleSignin.signOut();
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
