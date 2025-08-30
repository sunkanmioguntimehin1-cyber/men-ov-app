import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

type BottomType = {
  message: React.ReactNode;
  snapPoints?: (number | string)[]; // Pass height as percentage for better scaling
  index?: number;
  isBackdropComponent?: boolean;
  enablePanDownToClose?: boolean;
  pressBehavior?: "none" | "close" | "collapse"; // Define the allowed values
};
const BottomSheetScreen = React.forwardRef(
  (
    {
      message,
      snapPoints,
      index,
      isBackdropComponent,
      enablePanDownToClose,
      pressBehavior = "close", // Default value
    }: BottomType,
    ref
  ) => {
    // ref
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0} // Show backdrop when sheet is open
          disappearsOnIndex={-1} // Hide when sheet is closed
          // pressBehavior="close" // Close sheet when backdrop is pressed (optional)
          enablePanDownToClose={true}
          pressBehavior={pressBehavior} // Close sheet when backdrop is pressed (optional)
        />
      ),
      [pressBehavior]
    );

    return (
      <BottomSheet
        index={index}
        ref={ref as any}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={isBackdropComponent ? renderBackdrop : undefined}
      >
        <BottomSheetView>{message}</BottomSheetView>
      </BottomSheet>
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
