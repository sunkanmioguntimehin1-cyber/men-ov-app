import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  modelVisible: boolean;
  message: React.ReactNode;
  setModelVisible: (modelVisible: boolean) => void;
  closeOnOutsideClick?: boolean;
}

const CustomModel = ({
  modelVisible,
  message,
  setModelVisible,
  closeOnOutsideClick = true,
}: Props) => {
  return (
    <Modal
      visible={modelVisible}
      transparent
      animationType="slide"
      hardwareAccelerated
    >
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPress={() => {
          if (closeOnOutsideClick) {
            setModelVisible(false);
          }
        }}
      >
        <Text>{message}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModel;
