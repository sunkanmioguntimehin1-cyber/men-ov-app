// import React from "react";
// import { Modal, TouchableOpacity } from "react-native";

// interface Props {
//   modelVisible: boolean;
//   message: React.ReactNode;
//   setModelVisible: (modelVisible: boolean) => void;
//   closeOnOutsideClick?: boolean;
// }

// const CustomModel = ({
//   modelVisible,
//   message,
//   setModelVisible,
//   closeOnOutsideClick = true,
// }: Props) => {
//   return (
//     <Modal
//       visible={modelVisible}
//       transparent
//       animationType="slide"
//       hardwareAccelerated
//     >
//       <TouchableOpacity
//         style={{
//           backgroundColor: "rgba(0,0,0,0.6)",
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         activeOpacity={1}
//         onPress={() => {
//           if (closeOnOutsideClick) {
//             setModelVisible(false);
//           }
//         }}
//       >
//         {message}
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// export default CustomModel;


import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View
} from "react-native";

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
  const dismiss = () => {
    if (closeOnOutsideClick) {
      setModelVisible(false);
    }
  };

  return (
    <Modal
      visible={modelVisible}
      transparent
      animationType="slide"
      hardwareAccelerated
      onRequestClose={dismiss}
    >
      <View
        style={styles.container}
        pointerEvents="box-none"
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismiss}
        />
        {message}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});

export default CustomModel;