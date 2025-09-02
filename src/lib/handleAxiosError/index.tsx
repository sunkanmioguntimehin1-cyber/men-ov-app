import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

// interface ErrorResponse {
//   message?: string;
//   errors?: Record<string, string[]> | string;
// }

// export function handleAxiosError(error: unknown, showToast = true): void {
//   console.log("Handling error:", error);
//   if (isAxiosError(error)) {
//     const errorData = error.response?.data as ErrorResponse;
//     const statusCode = error.response?.status;
//     const errorsList = errorData?.errors;



//     if (showToast) {
//       if (errorsList && typeof errorsList === "object") {
//         // Handle object-style errors (e.g., validation errors)
//         for (const [_, messages] of Object.entries(errorsList)) {
//           if (Array.isArray(messages)) {
//             messages.forEach((message) => {
//               Toast.show({
//                 type: "error",
//                 text1: message,
//                 position: "top",
//               });
//             });
//           }
//         }
//       } else if (errorData?.message) {
//         // Handle single message error
//         Toast.show({
//           type: "error",
//           text1: errorData.message,
//           position: "top",
//         });
//       } else {
//         // Fallback for unknown axios error structure
//         Toast.show({
//           type: "error",
//           text1: `Request failed with status ${statusCode}`,
//           position: "top",
//         });
//       }
//     }
//   } else if (error instanceof Error) {
//     console.log("Generic error:", error);
//     if (showToast) {
//       Toast.show({
//         type: "error",
//         text1: error.message,
//         position: "top",
//       });
//     }
//   } else {
//     console.log("Unknown error type:", error);
//     if (showToast) {
//       Toast.show({
//         type: "error",
//         text1: "An unknown error occurred",
//         position: "top",
//       });
//     }
//   }
// }



interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]> | string;
  error?: string;
}

export function handleAxiosError(error: unknown, showToast = true): void {

  if (isAxiosError(error)) {
    const errorData = error.response?.data as ErrorResponse;
    const statusCode = error.response?.status;
    const errorsList = errorData.errors;

    

    if (showToast) {
      // 1) object-map of arrays
      if (errorsList && typeof errorsList === "object") {
        for (const messages of Object.values(errorsList)) {
          if (Array.isArray(messages)) {
            messages.forEach((msg) =>
              Toast.show({ type: "error", text1: msg, position: "top" })
            );
          }
        }
      }
      // 2) single string in `errors`
      else if (typeof errorsList === "string") {
        Toast.show({ type: "error", text1: errorsList, position: "top" });
      }
      // 3) single `message` property
      else if (errorData.message) {
        Toast.show({
          type: "error",
          text1: errorData.message,
          position: "top",
        });
      }
      // 4) single `error` property
      else if (errorData.error) {
        Toast.show({ type: "error", text1: errorData.error, position: "top" });
      }
      // 5) fallback
      else {
        Toast.show({
          type: "error",
          text1: `Request failed with status ${statusCode}`,
          position: "top",
        });
      }
    }
  } else if (error instanceof Error) {
    if (showToast) {
      Toast.show({ type: "error", text1: error.message, position: "top" });
    }
  } else {
    console.log("Unknown error type:", error);
    if (showToast) {
      Toast.show({
        type: "error",
        text1: "An unknown error occurred",
        position: "top",
      });
    }
  }
}
