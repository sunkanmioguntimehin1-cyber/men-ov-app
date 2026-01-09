import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface PopoverMenuItem {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  textColor?: string;
  iconColor?: string;
}

interface PopoverProps {
  visible: boolean;
  onClose: () => void;
  items: PopoverMenuItem[];
  anchorPosition?: {
    x: number;
    y: number;
  };
  minWidth?: number;
}

const Popover: React.FC<PopoverProps> = ({
  visible,
  onClose,
  items,
  anchorPosition,
  minWidth = 150,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={onClose}
      >
        <View
          className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            top: anchorPosition?.y || 80,
            right: anchorPosition?.x ? SCREEN_WIDTH - anchorPosition.x : 24,
            minWidth,
          }}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center px-4 py-3 ${
                index < items.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              {item.icon}
              <Text
                className="ml-3"
                style={{ color: item.textColor || "#374151" }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default Popover;
