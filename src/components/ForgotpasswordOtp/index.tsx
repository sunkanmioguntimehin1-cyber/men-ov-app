import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const CELL_COUNT = 4;
const { width } = Dimensions.get("window");

const ForgotPasswordOtp = ({ value, setValue }: Props) => {
  const navigation = useNavigation();
  const [isFull, setIsFull] = React.useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleFulfill = (code: any) => {
    if (code?.length === CELL_COUNT) {
      setIsFull(true);
      setValue(code);
      // navigation.navigate("ConfirmPin");
    }
  };

  // Calculate responsive cell width based on screen width
  const cellWidth = Math.min((width - 80) / CELL_COUNT - 8, 100);

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        secureTextEntry={true}
        onChangeText={(code) => {
          setValue(code);
          handleFulfill(code);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cellContainer,
              { width: cellWidth },
              isFocused && styles.focusCell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={[styles.cellText, { fontSize: 80 }]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  codeFiledRoot: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cellContainer: {
    // height: rV(60),
    // borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#D0D5DD",
    // borderRadius: 8,
    // backgroundColor: "#FFFFFF",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontFamily: "PoppinsMedium",
    color: "#712A87",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  focusCell: {
    borderColor: "#D6BBFB",
    // borderWidth: 2,
  },
});

export default ForgotPasswordOtp;



// import { rV } from "@/src/lib/responsivehandler";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { Dimensions, StyleSheet, Text, View } from "react-native";
// import {
//     CodeField,
//     Cursor,
//     useBlurOnFulfill,
//     useClearByFocusCell,
// } from "react-native-confirmation-code-field";

// type Props = {
//   value: string;
//   setValue: (value: string) => void;
// };

// const CELL_COUNT = 6;
// const { width } = Dimensions.get("window");

// const ForgotPasswordOtp = ({ value, setValue }: Props) => {
//   const navigation = useNavigation();
//   const [isFull, setIsFull] = React.useState(false);
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   const handleFulfill = (code: any) => {
//     if (code?.length === CELL_COUNT) {
//       setIsFull(true);
//       setValue(code);
//       // navigation.navigate("ConfirmPin");
//     }
//   };

//   // Calculate responsive line width based on screen width
//   const lineWidth = Math.min((width - 80) / CELL_COUNT - 8, 60);

//   return (
//     <View style={styles.container}>
//       <CodeField
//         ref={ref}
//         {...props}
//         value={value}
//         secureTextEntry={true}
//         onChangeText={(code) => {
//           setValue(code);
//           handleFulfill(code);
//         }}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFiledRoot}
//         keyboardType="number-pad"
//         renderCell={({ index, symbol, isFocused }) => (
//           <View
//             key={index}
//             style={[
//               styles.lineContainer,
//               { width: lineWidth },
//               isFocused && styles.focusLine,
//             ]}
//             onLayout={getCellOnLayoutHandler(index)}
//           >
//             <Text
//               style={[
//                 styles.lineText,
//                 {
//                   color: symbol ? "#5D47B9" : "#DBDBDB", // Purple for filled, gray for unfilled
//                   fontSize: lineWidth * 0.6,
//                 },
//               ]}
//             >
//               {symbol || (isFocused ? <Cursor /> : null)}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   codeFiledRoot: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   lineContainer: {
//     height: rV(2), // Thin vertical line
//     borderWidth: 1,
//     borderColor: (symbol) => (symbol ? "#5D47B9" : "#DBDBDB"), // Dynamic border color
//     borderRadius: 2,
//     marginHorizontal: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lineText: {
//     fontFamily: "PoppinsMedium",
//     textAlign: "center",
//     includeFontPadding: false,
//     position: "absolute",
//     top: -rV(40), // Position text above the line
//   },
//   focusLine: {
//     borderColor: "#5D47B9", // Active line color
//     borderWidth: 2,
//   },
// });

// export default ForgotPasswordOtp;