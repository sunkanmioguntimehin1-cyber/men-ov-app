import CustomButton from "@/src/custom-components/CustomButton";
import Screen from "@/src/layout/Screen";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, } from "react-native";

export default function GetStarted() {
  const router = useRouter();

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // setState({ userInfo: response.data });
        console.log("User Info --> ", response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <>
      <Screen className="  pt-safe">
        <View className=" items-center flex-1">
          <View className=" w-52 h-56 ">
            <Image
              source={require("@/assets/images/signin-logo.png")}
              style={{
                height: "100%",
                width: "100%",
                alignSelf: "center",
                // borderRadius: 100,
              }}
              contentFit="fill"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>
        </View>

        <View className=" p-8 ">
          <View>
            <CustomButton
              primary
              title="Continue with email"
              onPress={() => {
                router.push("/(auth)/login");
              }}
            />
          </View>
          <View className="my-5">
            <CustomButton
              whiteBg
              title="Continue with google"
              onPress={signIn}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}




