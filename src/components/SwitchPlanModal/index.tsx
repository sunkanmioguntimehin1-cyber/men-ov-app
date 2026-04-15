// import { MaterialIcons } from "@expo/vector-icons";
// import { Skeleton } from "moti/skeleton";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { WebView } from "react-native-webview";

// const SwitchPlanModal = ({
//   onCancel,
//   cancelSubscription,
// }: {
//   onCancel: () => void;
//   cancelSubscription: any;
// }) => {
//   const [webViewLoading, setWebViewLoading] = React.useState(false);
//   const url = cancelSubscription.data?.url;

//   console.log("url", url);

//   const handleWebViewMessage = async (event: any) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     console.log("Data200", data);
//   };

//   const Spacer = ({ height = 16 }) => <View style={{ height }} />;

//   return (
//     <View className="  w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
//       <View className=" flex-row items-center justify-between">
//         <Skeleton
//           show={webViewLoading || cancelSubscription.isPending}
//           colorMode={"light"}
//         >
//           <Text> Sorry to see you go </Text>
//         </Skeleton>
//         <TouchableOpacity onPress={onCancel}>
//           <MaterialIcons name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <Spacer height={12} />
//       <Skeleton
//         show={webViewLoading || cancelSubscription.isPending}
//         colorMode={"light"}
//       >
//         {/* <View className=" flex-row items-center justify-between"></View> */}
//         <>
//           <Text className=" text-lg font-[PoppinsMedium]">
//             Are you sure you want to cancel your subscription?
//           </Text>

//           <WebView
//             source={{ uri: url }}
//             style={{ flex: 1 }}
//             onMessage={handleWebViewMessage}
//             onLoadStart={() => {
//               console.log("WebView started loading");
//               setWebViewLoading(true);
//             }}
//             onLoadEnd={() => {
//               console.log("WebView finished loading");
//               setWebViewLoading(false);
//             }}
//             javaScriptEnabled
//             domStorageEnabled
//           />
//           <TouchableOpacity onPress={onCancel}>
//             <Text>Cancel</Text>
//           </TouchableOpacity>
//         </>
//       </Skeleton>
//     </View>
//   );
// };

// export default SwitchPlanModal;

import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

const SwitchPlanModal = ({
  onCancel,
  manageSubscription,
}: {
  onCancel: () => void;
  manageSubscription: any;
}) => {
  const router = useRouter();
  const [webViewLoading, setWebViewLoading] = React.useState(false);
  const url = manageSubscription.data?.url;

  // Track if we should show the skeleton
  const isLoading = webViewLoading || manageSubscription.isPending;
  const Spacer = ({ height = 16 }) => <View style={{ height }} />;
  return (
    // Added h-[500px] or similar to give the modal enough space
    <View className="w-96 h-[600px] p-5 bg-white rounded-lg shadow-lg overflow-hidden">
      <View className="flex-row items-center justify-between">
        <Skeleton show={isLoading} colorMode="light">
          <Text className="font-[PoppinsSemiBold]"></Text>
        </Skeleton>
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Spacer height={12} />

      <Skeleton show={isLoading} colorMode="light">
        <Text className="text-lg font-[PoppinsMedium]">
          Switch Plan Request
        </Text>
      </Skeleton>

      <Spacer height={12} />

      {/* CRITICAL FIX: 
          The WebView needs a container with a height or flex:1 
          within a parent that has a height.
      */}
      <View className="flex-1 border border-gray-100 rounded-md overflow-hidden">
        {url ? (
          <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
            onLoadStart={() => setWebViewLoading(true)}
            onLoadEnd={() => setWebViewLoading(false)}
            javaScriptEnabled
            domStorageEnabled
            // RevenueCat portals often require specific User Agents or headers
            startInLoadingState={true}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text>Loading portal...</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        // onPress={onCancel}
        onPress={() => {
          router.push("/homepage");
        }}
        className="mt-4 py-3 items-center bg-gray-100 rounded-lg"
      >
        <Text className="font-[PoppinsMedium]">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SwitchPlanModal;
