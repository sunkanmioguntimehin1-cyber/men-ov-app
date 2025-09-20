import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface PolicyLinkProps {
  text: string;
  onPress: () => void;
}

const PolicyLink = ({ text, onPress }: PolicyLinkProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{ color: "#007AFF", textDecorationLine: "underline" }}>
      {text}
    </Text>
  </TouchableOpacity>
);

interface TermsAndPrivacyProps {
  containerStyle?: object;
  textStyle?: object;
}

const TermsAndPrivacy = ({
  containerStyle,
  textStyle,
}: TermsAndPrivacyProps) => {
  const handleOpenPrivacyPolicy = async () => {
    const uri = "https://menoviahealth.com/privacy.html";
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      Alert.alert("Failed to fetch receipt.");
    }
  };

  const handleOpenTermsAndConditions = async () => {
    const uri = "https://menoviahealth.com/terms.html";
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      Alert.alert("Failed to fetch receipt.");
    }
  };

  return (
    <>
      <View
        style={[
          { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
          containerStyle,
        ]}
      >
        <Text style={[{ textAlign: "center" }, textStyle]} className="mx-1">
          {/* I accept the */}
          By continuing you agree to our
        </Text>
        <PolicyLink text="privacy policy" onPress={handleOpenPrivacyPolicy} />
        <Text style={textStyle} className="">
          {" "}
          and{" "}
        </Text>
        <PolicyLink
          text="terms and conditions"
          onPress={handleOpenTermsAndConditions}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    padding: 5,
  },
  webViewContainer: {
    flex: 1,
  },
});

export default TermsAndPrivacy;
