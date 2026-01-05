// import { useViewAPost } from "@/src/api_services/postsApi/postQuery";
// import Screen from "@/src/layout/Screen";
// import { rS } from "@/src/lib/responsivehandler";
// import { getInitials } from "@/src/utils/getInitials";
// import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo } from "react";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// const CommentsScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const newData = useMemo(() => {
//     return params.item ? JSON.parse(params.item as string) : null;
//   }, [params.item]);

//   const viewUserPosts = useViewAPost(newData);

//   console.log("newData300", newData);
//   console.log(viewUserPosts?.data, "viewUserPostsBB");

//   React.useEffect(() => {
//     if (newData) {
//       console.log("View Product Data:", viewUserPosts.data);
//       viewUserPosts.refetch();
//     }
//   }, [newData]);

//   const handleComments = (postId: string) => {
//     router.push({
//       pathname: `/(tabs)/communitypage/comments`,
//       params: { item: JSON.stringify(postId) },
//     });
//   };

//   return (
//     <Screen className="p-6">
//       <View className="flex-row items-center justify-between my-2  bg-white">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text className="font-[PoppinsSemiBold]" style={{ fontSize: rS(12) }}>
//             View Post
//           </Text>
//         </View>
//         {/* <TouchableOpacity>
//           <Feather name="edit" size={18} color="black" />
//         </TouchableOpacity> */}
//         <View />
//       </View>

//       <ScrollView className="">
//         <View className="bg-white rounded-2xl shadow-sm  overflow-hidden mb-4">
//           {/* Post Header */}
//           <View className="flex-row items-center py-2">
//             {/* <View className="w-10 h-10 rounded-full mr-3">
//               <Image
//                 source={{
//                   uri: viewUserPosts.data?.images[0],
//                 }}
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   borderRadius: 100,
//                 }}
//                 contentFit="cover"
//               />
//             </View> */}

//             <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center ">
//               <Text>{getInitials(viewUserPosts.data?.user?.fullname)}</Text>
//             </View>

//             <View className="mx-2">
//               <Text className="font-bold text-black">
//                 {viewUserPosts.data?.user?.fullname}
//               </Text>
//             </View>

//             <TouchableOpacity className="flex-1 items-end mr-4">
//               <Entypo name="dots-three-vertical" size={24} color="black" />
//             </TouchableOpacity>
//           </View>

//           {/* Post Description */}
//           <View className="px-4 pb-3">
//             <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
//               {viewUserPosts.data?.title}
//             </Text>
//             <Text className="text-gray-700 text-sm leading-5">
//               {viewUserPosts.data?.content}
//             </Text>
//           </View>

//           {/* Post Image */}
//           {viewUserPosts.data?.images[0] && (
//             <View className="w-full h-96">
//               <Image
//                 source={{
//                   // uri: item.images[0],
//                   uri: viewUserPosts.data?.images[0],
//                 }}
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                 }}
//                 contentFit="cover"
//               />
//             </View>
//           )}

//           {/* Action Bar */}
//           <View className="flex-row items-center justify-between p-4">
//             <View className="flex-row items-center space-x-4">
//               <TouchableOpacity
//                 className="  flex-row items-center justify-center"
//                 // onPress={() => handleLikeProduct(item.id)}
//               >
//                 {viewUserPosts.data?.isLiked ? (
//                   <MaterialCommunityIcons
//                     name="thumb-up"
//                     size={20}
//                     color="black"
//                   />
//                 ) : (
//                   <MaterialCommunityIcons
//                     name="thumb-up-outline"
//                     size={20}
//                     color="black"
//                   />
//                 )}
//                 <Text className=" mx-2 text-lg">
//                   {viewUserPosts.data?.likes}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className="mx-2  flex-row items-center"
//                 onPress={() => handleComments(viewUserPosts.data._id)}
//               >
//                 <Ionicons name="chatbubble-outline" size={20} color="#666" />

//                 <Text className="text-xs text-gray-600 ml-1">
//                   {viewUserPosts.data?.commentCount} Comments
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </Screen>
//   );
// };

// export default CommentsScreen;



import { useViewAPost } from "@/src/api_services/postsApi/postQuery";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import Popover from "@/src/custom-components/Popover";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const CommentsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

    const getUserData = useGetUser();
  const viewUserPosts = useViewAPost(newData);

  console.log("newData300", newData);
  console.log(viewUserPosts?.data, "viewUserPostsBB");

  React.useEffect(() => {
    if (newData) {
      console.log("View Product Data:", viewUserPosts.data);
      viewUserPosts.refetch();
    }
  }, [newData]);

  const handleComments = (postId: string) => {
    router.push({
      pathname: `/(tabs)/communitypage/comments`,
      params: { item: JSON.stringify(postId) },
    });
  };

  const handleOpenPopover = (event: any) => {
    event.currentTarget.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setPopoverPosition({ x: pageX + width, y: pageY + height });
        setShowPopover(true);
      }
    );
  };

  const handleEdit = () => {
    setShowPopover(false);
    // Add your edit logic here
    router.push({
      pathname: `/(tabs)/communitypage/edit-post`,
      params: { item: JSON.stringify(viewUserPosts.data?._id) },
    });
    // console.log("Edit post:", viewUserPosts.data?._id);
  };

  const handleDelete = () => {
    setShowPopover(false);
    // Add your delete logic here
    console.log("Delete post:", viewUserPosts.data?._id);
  };

  const popoverItems = [
    {
      label: "Edit",
      icon: <Feather name="edit" size={18} color="#2E6939" />,
      onPress: handleEdit,
      textColor: "#374151",
    },
    {
      label: "Delete",
      icon: <Feather name="trash-2" size={18} color="#DC2626" />,
      onPress: handleDelete,
      textColor: "#DC2626",
    },
  ];

  return (
    <Screen className="p-6">
      <View className="flex-row items-center justify-between my-2 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text className="font-[PoppinsSemiBold]" style={{ fontSize: rS(12) }}>
            View Post
          </Text>
        </View>
        <View />
      </View>

      <ScrollView className="">
        <View className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          {/* Post Header */}
          <View className="flex-row justify-between items-center py-2">
            <View className="flex-row  items-center py-2">
              <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center">
                {viewUserPosts.data?.user?.picture ? (
                  <Image
                    source={{ uri: viewUserPosts.data?.user?.picture }}
                    style={{ width: 40, height: 40 }}
                    contentFit="cover"
                  />
                ) : (
                  <Text>{getInitials(viewUserPosts.data?.user?.fullname)}</Text>
                )}
              </View>

              <View className="mx-2">
                <Text className="font-bold text-black">
                  {viewUserPosts.data?.user?.fullname}
                </Text>
              </View>
            </View>

            {getUserData?.data?.id === viewUserPosts.data?.user?._id ? (
              <TouchableOpacity
                className=""
                onPress={(e) => handleOpenPopover(e)}
              >
                <Entypo name="dots-three-vertical" size={20} color="black" />
              </TouchableOpacity>
            ) : null}

            {/* <TouchableOpacity
              className="mr-4"
              onPress={(e) => handleOpenPopover(e)}
            >
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity> */}
          </View>

          {/* Post Description */}
          <View className="px-4 pb-3">
            <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
              {viewUserPosts.data?.title}
            </Text>
            <Text className="text-gray-700 text-sm leading-5">
              {viewUserPosts.data?.content}
            </Text>
          </View>

          {/* Post Image */}
          {viewUserPosts.data?.images[0] && (
            <View className="w-full h-96">
              <Image
                source={{
                  uri: viewUserPosts.data?.images[0],
                }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                contentFit="cover"
              />
            </View>
          )}

          {/* Action Bar */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity className="flex-row items-center justify-center">
                {viewUserPosts.data?.isLiked ? (
                  <MaterialCommunityIcons
                    name="thumb-up"
                    size={20}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={20}
                    color="black"
                  />
                )}
                <Text className="mx-2 text-lg">
                  {viewUserPosts.data?.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mx-2 flex-row items-center"
                onPress={() => handleComments(viewUserPosts.data._id)}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#666" />
                <Text className="text-xs text-gray-600 ml-1">
                  {viewUserPosts.data?.commentCount} Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Popover Menu */}
      <Popover
        visible={showPopover}
        onClose={() => setShowPopover(false)}
        items={popoverItems}
        anchorPosition={popoverPosition}
      />
    </Screen>
  );
};

export default CommentsScreen;