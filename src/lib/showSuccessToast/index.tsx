import Toast from "react-native-toast-message";

type SuccessParams = {
  message?: string;
  title?: string;
  data?: any;
  defaultMessage?: string;
};

export const showSuccessToast = ({
  message,
  title = "Success",
  data,
  defaultMessage = "Operation completed successfully",
}: SuccessParams) => {
  Toast.show({
    type: "success",
    text2: title,
    text1: message || data?.message || defaultMessage,
    position: "top",
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

// Optional: Add a more specific success handler for common scenarios
export const showRegistrationSuccess = (data?: any) => {
  showSuccessToast({
    title: "Registration Complete",
    message: data?.message || "Your account has been created successfully",
  });
};
