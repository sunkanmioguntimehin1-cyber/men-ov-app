// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import React, { useCallback } from "react";
// import { StyleSheet, View } from "react-native";

// type BottomType = {
//   message: React.ReactNode;
//   snapPoints?: (number | string)[]; // Pass height as percentage for better scaling
//   index?: number;
//   isBackdropComponent?: boolean;
//   enablePanDownToClose?: boolean;
//   pressBehavior?: "none" | "close" | "collapse"; // Define the allowed values
//   bgColor?: string;
// };
// const BottomSheetScreen = React.forwardRef(
//   (
//     {
//       message,
//       snapPoints,
//       index,
//       isBackdropComponent,
//       enablePanDownToClose,
//       pressBehavior = "close", // Default value
//       bgColor,
//     }: BottomType,
//     ref
//   ) => {
//     // ref
//     // callbacks
//     const handleSheetChanges = useCallback((index: number) => {
//       console.log("handleSheetChanges", index);
//     }, []);

//     const renderBackdrop = useCallback(
//       (props: any) => (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0} // Show backdrop when sheet is open
//           disappearsOnIndex={-1} // Hide when sheet is closed
//           // pressBehavior="close" // Close sheet when backdrop is pressed (optional)
//           enablePanDownToClose={true}
//           pressBehavior={pressBehavior} // Close sheet when backdrop is pressed (optional)
//         />
//       ),
//       [pressBehavior]
//     );

//     return (
//       <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
//         <BottomSheet
//           index={index}
//           ref={ref as any}
//           onChange={handleSheetChanges}
//           snapPoints={snapPoints}
//           enablePanDownToClose={enablePanDownToClose}
//           backdropComponent={isBackdropComponent ? renderBackdrop : undefined}
//           backgroundStyle={{ backgroundColor: bgColor || "#FFFFFF" }}
//         >
//           <BottomSheetView>{message}</BottomSheetView>
//         </BottomSheet>
//       </View>
//     );
//   }
// );

// BottomSheetScreen.displayName = "BottomSheetScreen";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // height: 200,
//     // backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 36,
//     alignItems: "center",
//   },
// });

// export default BottomSheetScreen;





import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

type BottomType = {
  message: React.ReactNode;
  snapPoints?: (number | string)[]; // Pass height as percentage for better scaling
  index?: number;
  isBackdropComponent?: boolean;
  enablePanDownToClose?: boolean;
  pressBehavior?: "none" | "close" | "collapse"; // Define the allowed values
  bgColor?: string;
};
const BottomSheetScreen = React.forwardRef(
  (
    {
      message,
      snapPoints,
      index,
      isBackdropComponent,
      enablePanDownToClose,
      pressBehavior = "close",
      bgColor,
    }: BottomType,
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
      setIsOpen(index !== -1);
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          enablePanDownToClose={true}
          pressBehavior={pressBehavior}
        />
      ),
      [pressBehavior]
    );

    // Only render when open or about to open
    if (!isOpen && index === -1) {
      return null;
    }

    return (
      <View >
        <BottomSheet
          index={index}
          ref={ref as any}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          enablePanDownToClose={enablePanDownToClose}
          backdropComponent={isBackdropComponent ? renderBackdrop : undefined}
          backgroundStyle={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          <BottomSheetView>{message}</BottomSheetView>
        </BottomSheet>
      </View>
    );
  }
);

BottomSheetScreen.displayName = "BottomSheetScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 200,
    // backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default BottomSheetScreen;
