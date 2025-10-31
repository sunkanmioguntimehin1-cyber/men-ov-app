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
  TouchableWithoutFeedback,
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
  return (
    <Modal
      visible={modelVisible}
      transparent
      animationType="slide"
      hardwareAccelerated
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (closeOnOutsideClick) {
              setModelVisible(false);
            }
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </TouchableWithoutFeedback>
        {message}
      </View>
    </Modal>
  );
};

export default CustomModel;