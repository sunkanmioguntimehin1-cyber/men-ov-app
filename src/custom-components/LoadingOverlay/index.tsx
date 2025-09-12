// import React from "react";
// import { Image, Modal, Text, View } from "react-native";

// // Import your logo image
// // import logo2 from "@/assets/images/logo2.png";

// type LoadingOverlayProps = {
//   isOpen: boolean;
//   message?: string;
//   backdropClassName?: string;
//   animationType?: "spin" | "pulse" | "bounce" | "fade";
// };

// export default function LoadingOverlay({
//   isOpen,
//   message = "Loading...",
//   backdropClassName,
//   animationType = "spin",
// }: LoadingOverlayProps) {
//   if (!isOpen) return null;

//   const getAnimationClass = () => {
//     switch (animationType) {
//       case "spin":
//         return "animate-spin";
//       case "pulse":
//         return "animate-pulse";
//       case "bounce":
//         return "animate-bounce";
//       case "fade":
//         return "animate-pulse";
//       default:
//         return "animate-spin";
//     }
//   };

//   return (
//     <Modal
//       visible={isOpen}
//       transparent={true}
//       animationType="fade"
//       statusBarTranslucent={true}
//     >
//       <View
//         className={`flex-1 items-center  bg-transparent justify-center bg-black/80 ${
//           backdropClassName || ""
//         }`}
//       >
//         <View className="flex-col items-center justify-center rounded-2xl bg-white/90 px-8 py-8 shadow-2xl  mx-4">
//           {/* Spinning Logo with Ring */}
//           <View className="relative">
//             {/* Outer spinning ring */}
//             <View className="absolute inset-0 h-24 w-24 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />

//             {/* Logo in center */}
//             <View className="relative h-16 w-16 m-4 items-center justify-center">
//               <Image
//                 source={require("@/assets/images/logo2.png")} // Adjust path as needed
//                 className={`h-full w-full object-contain ${getAnimationClass()}`}
//                 resizeMode="contain"
//               />
//             </View>
//           </View>

//           {/* Loading dots animation */}
//           <View className="flex-row space-x-1 mt-4">
//             <View
//               className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
//               style={{ animationDelay: 0 }}
//             />
//             <View
//               className="h-2 w-2 bg-blue-500 rounded-full animate-bounce mx-1"
//               style={{ animationDelay: 100 }}
//             />
//             <View
//               className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
//               style={{ animationDelay: 200 }}
//             />
//           </View>

//           <Text className="mt-4 text-base font-medium text-gray-700 text-center">
//             {message}
//           </Text>
//         </View>
//       </View>
//     </Modal>
//   );
// }


import React from "react";
import { Image, Modal, View } from "react-native";

// Import your logo image
// import logo2 from "@/assets/images/logo2.png";

type LoadingOverlayProps = {
  isOpen: boolean;
  message?: string;
  backdropClassName?: string;
  animationType?: "spin" | "pulse" | "bounce" | "fade";
};

export default function LoadingOverlay({
  isOpen,
  message = "Loading...",
  backdropClassName,
  animationType = "spin",
}: LoadingOverlayProps) {
  if (!isOpen) return null;

  const getAnimationClass = () => {
    switch (animationType) {
      case "spin":
        return "animate-spin";
      case "pulse":
        return "animate-pulse";
      case "bounce":
        return "animate-bounce";
      case "fade":
        return "animate-pulse";
      default:
        return "animate-spin";
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View
        className={`flex-1 items-center justify-center ${
          backdropClassName || ""
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0.5, 0.32)" }}
      >
        <View className="flex-col items-center justify-center rounded-2xl bg-white/90 px-8 py-8 shadow-2xl  mx-4">
          {/* Spinning Logo with Ring */}
          <View className="relative">
            {/* Outer spinning ring */}
            <View className="absolute inset-0 h-24 w-24 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />

            {/* Logo in center */}
            <View className="relative h-16 w-16 m-4 items-center justify-center">
              <Image
                source={require("@/assets/images/logo.png")} // Adjust path as needed
                className={`h-full w-full object-contain ${getAnimationClass()}`}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Loading dots animation */}
          <View className="flex-row  space-x-1 mt-4">
            <View
              className="h-2 w-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: 0 }}
            />
            <View
              className="h-2 w-2 bg-primary rounded-full animate-bounce mx-1"
              style={{ animationDelay: 100 }}
            />
            <View
              className="h-2 w-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: 200 }}
            />
          </View>

          {/* <Text className="mt-4 bg-primary p-4 text-base font-medium text-white text-center">
            {message}
          </Text> */}
        </View>
      </View>
    </Modal>
  );
}