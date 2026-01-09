import { useDeleteAPostApi } from '@/src/api_services/postsApi/postsMutation';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const DeletePostModal = ({ onCancel, getPostId, setModelVisible }: any) => {

const deleteAPost = useDeleteAPostApi()

	const handleOnDelete = () => {
		deleteAPost.mutate(getPostId)
		setModelVisible(false);
	};

  return (
    <View className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Warning Icon and Title */}
      <View className=" p-4 items-center">
        {/* <Trash2 color="#dc2626" size={48} strokeWidth={1.5} /> */}

        <Text className="font-[PoppinsBold] mt-2">Delete this post?</Text>
      </View>

      {/* Description */}
      <View className="px-4">
        <Text className="text-center text-[#FF383C] font-[PoppinsRegular] text-sm">
          This will remove it from the community. You can’t undo this.
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="p-4  bg-white ">
        <TouchableOpacity
          className="   bg-[#F4D5D6] p-4  items-center rounded-md"
          onPress={handleOnDelete}
        >
          <Text className="text-[#CA2B30] text-center font-[PoppinsBold] text-sm">
            {deleteAPost.isPending ? "Deleting..." : "Delete Post"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="  my-2 bg-white p-4 border border-gray-200 items-center rounded-md"
            onPress={onCancel}
        >
          <Text className="text-[#667085] text-center font-[PoppinsBold] text-sm">
            Cancel
          </Text>
        </TouchableOpacity>

        <View className=" mx-1" />

        {/* <TouchableOpacity
          className="flex-1   items-center justify-center rounded-md"
          onPress={onAgree}
        >
          <LinearGradient
            colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 6,
            }}
            // className="items-center justify-center rounded-md"
          >
            <Text className="font-[PoppinsBold] p-4 text-sm text-white">
              I Agree
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default DeletePostModal
