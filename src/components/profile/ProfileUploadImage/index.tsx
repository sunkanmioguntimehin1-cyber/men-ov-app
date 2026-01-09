// import {
//   useGetUploadUrl,
//   useImageUpload,
// } from "@/src/api_services/uploadApi/uploadMutations";
// import { AntDesign, Entypo } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import * as ImagePicker from "expo-image-picker";
// import React from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const ProfileUploadImage = ({ setNotePublicUrls, notePublicUrls }: any) => {
//   const [storeData, setStoreData] = React.useState<string | any>(null);
//   const [imageSelected, setImageSelected] = React.useState<any>(null);

//   const handleStoreData = (data: any) => {
//     setStoreData(data);
//     if (data?.publicUrl) {
//       setNotePublicUrls((prev: any) => [...prev, data.publicUrl]);
//     }
//     // keep track of only URLs
//   };

//   console.log("notePublicUrls", notePublicUrls);

//   //UPLOADING
//   const {
//     uploadImage: imageUploadedSelected,
//     imageData: itemImgData,
//     isImageUploadPending: ImgIsPending,
//     isImageUploadError: ImgIsError,
//     resetImageData,
//   } = useImageUpload(storeData);

//   const getUploadUrlData = useGetUploadUrl(handleStoreData);

//   React.useEffect(() => {
//     if (storeData?.uploadUrl && imageSelected?.uri) {
//       imageUploadedSelected(imageSelected.uri);
//     }
//   }, [storeData]);

//   const handleImagePick = async () => {
//     try {
//       await ImagePicker.requestCameraPermissionsAsync();
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaType,
//         allowsEditing: false,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const selectedAsset = result.assets[0];
//         setImageSelected(selectedAsset);

//         // Request upload URL - this will trigger the useEffect above once complete
//         getUploadUrlData.mutate({
//           fileName: selectedAsset.fileName,
//         });
//       }
//     } catch (error) {
//       console.log("error from image upload", error);
//     }
//   };

//   const handleCloseImage = () => {
//     setImageSelected(null);
//     resetImageData();
//     setNotePublicUrls([]);
//   };

//   return (
//     <ScrollView>
//       <View className="my-5 ">
//         {imageSelected ? (
//           <View className="w-32 h-32 rounded-full bg-purple-200 items-center justify-center mb-4">
//             {ImgIsPending ? (
//               <View>
//                 <ActivityIndicator size={40} />
//               </View>
//             ) : (
//               <View className=" flex-row ">
//                 {ImgIsError ? (
//                   <View className="text-red-500">
//                     <Text>Upload Failed. Try Again.</Text>
//                   </View>
//                 ) : (
//                   <View className=" w-32 h-32 items-center justify-center">
//                     <Image
//                       source={{ uri: storeData?.publicUrl }}
//                       style={{ width: "100%", height: "100%", borderRadius: 100 }}
//                       contentFit="fill"
//                     />
//                   </View>
//                 )}

//                 <TouchableOpacity onPress={handleCloseImage} className=" bg-blue-400">
//                   <AntDesign name="close" size={18} color="red" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         ) : (
//           <View>
//             <TouchableOpacity
//               className="w-32 h-32 rounded-full bg-purple-200 items-center justify-center mb-4"
//               onPress={handleImagePick}
//             >
//               <View className="">
//                 <Entypo name="plus" size={20} color="#8A3FFC" />
//               </View>
//               <Text className=" text-sm font-[PoppinsMedium] mx-2">
//                 Add image
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileUploadImage;


import {
  useGetUploadUrl,
  useImageUpload,
} from "@/src/api_services/uploadApi/uploadMutations";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileUploadImageProps {
  setNotePublicUrls: (urls: any) => void;
  notePublicUrls: string[];
}

const ProfileUploadImage: React.FC<ProfileUploadImageProps> = ({
  setNotePublicUrls,
  notePublicUrls,
}) => {
  const [storeData, setStoreData] = React.useState<string | any>(null);
  const [imageSelected, setImageSelected] = React.useState<any>(null);

  const handleStoreData = (data: any) => {
    setStoreData(data);
    if (data?.publicUrl) {
      // setNotePublicUrls((prev: any) => [...prev, data.publicUrl]);
       setNotePublicUrls(data.publicUrl);
    }
  };

  console.log("notePublicUrls", notePublicUrls);

  //UPLOADING
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  const getUploadUrlData = useGetUploadUrl(handleStoreData);

  React.useEffect(() => {
    if (storeData?.uploadUrl && imageSelected?.uri) {
      imageUploadedSelected(imageSelected.uri);
    }
  }, [storeData]);

  const handleImagePick = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImageSelected(selectedAsset);

        // Request upload URL - this will trigger the useEffect above once complete
        getUploadUrlData.mutate({
          fileName: selectedAsset.fileName,
        });
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

  const handleCloseImage = () => {
    setImageSelected(null);
    resetImageData();
    setStoreData(null);
    setNotePublicUrls("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {imageSelected ? (
          <View style={styles.imageOuterContainer}>
            {ImgIsPending ? (
              // Loading State
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8A3FFC" />
                <Text style={styles.loadingText}>Uploading...</Text>
              </View>
            ) : ImgIsError ? (
              // Error State
              <View style={styles.errorContainer}>
                <AntDesign
                  name="exclamationcircleo"
                  size={40}
                  color="#EF4444"
                />
                <Text style={styles.errorText}>Upload Failed</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleImagePick}
                  activeOpacity={0.7}
                >
                  <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCloseImage}
                  style={styles.closeButtonError}
                  activeOpacity={0.7}
                >
                  <AntDesign name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              // Success State - Image Uploaded
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: storeData?.publicUrl }}
                  style={styles.uploadedImage}
                  contentFit="cover"
                />
                <TouchableOpacity
                  onPress={handleCloseImage}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <AntDesign name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          // Empty State - Add Image Button
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={handleImagePick}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Entypo name="plus" size={24} color="#8A3FFC" />
            </View>
            <Text style={styles.addImageText}>Add image</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOuterContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#E9D5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 12,
    color: "#8A3FFC",
    fontWeight: "600",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    position: "relative",
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: "#8A3FFC",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  retryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  closeButtonError: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    position: "relative",
    overflow: "hidden",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 64,
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addImageButton: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#E9D5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#8A3FFC",
    borderStyle: "dashed",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  addImageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8A3FFC",
    marginTop: 4,
  },
});

export default ProfileUploadImage;