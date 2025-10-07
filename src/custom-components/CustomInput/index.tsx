// import { rS, rV } from "@/src/lib/responsivehandler";
// import React from "react";
// import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

// type InputType = {
//   label?: string;
//   name?: string;
//   placeholder?: string;
//   icon?: React.ReactNode;
//   iconPostion?: string;
//   value?: string;
//   onChangeText?: (text?: string) => void;
//   secureTextEntry?: boolean;
//   keyboardType?: string;
//   primary?: boolean;
//   whiteBg?: boolean;
//   width?: number;
//   multiline?: boolean;
//   onBlur?: () => void;
//   onFocus?: () => void;
//   error?: string;
//   editable?: boolean;
//   isLoading?: boolean;
//   isArabic?: boolean;
//   normalize?: boolean; // New prop for normalization
// };

// const CustomInput = ({
//   label,
//   icon,
//   iconPostion,
//   onChangeText,
//   value,
//   placeholder,
//   secureTextEntry,
//   keyboardType,
//   primary,
//   whiteBg,
//   error,
//   editable,
//   onFocus,
//   isArabic,
//   onBlur,
//   multiline,
//   isLoading,
//   normalize = true,
// }: // width,
// InputType) => {
//   const [focused, setFocused] = React.useState(false);
//   // const width = 60

//   const getFlexDirection = () => {
//     if (!icon && !iconPostion) {
//       return "flex-row";
//     }
//     if (icon && iconPostion) {
//       if (iconPostion === "left") {
//         return "flex-row";
//       } else {
//         if (iconPostion === "right") {
//           return "flex-row-reverse";
//         }
//       }
//     }
//   };

//   const getBgColor = () => {
//     if (primary) return "border border-[#EAEAEA] bg-onsurface";
//     if (whiteBg) return "bg-[#ffffff] border border-divider";
//   };

//   const handleChangeText = (text: string) => {
//     const processed = normalize ? text.trim() : text;
//     onChangeText?.(processed);
//   };

//   // Optional: Final cleanup on blur
//   const handleBlur = () => {
//     if (onBlur) {
//       const finalValue = value?.trim();
//       // If value changed, update it
//       if (value !== finalValue) {
//         onChangeText?.(finalValue);
//       }
//       onBlur();
//     }
//     setFocused(false);
//   };
//   return (
//     <>
//       <View className="my-1">
//         <>
//           {label && (
//             <Text
//               className="mb-2 font-[PoppinsMedium] text-[#101828] "
//               style={{ fontSize: rS(12) }}
//             >
//               {label}
//             </Text>
//           )}
//         </>
//         <View
//           className={` rounded-2xl ${getBgColor()}  items-center px-3 ${getFlexDirection()}`}
//           style={{ height: rV(40) }}
//         >
//           <View className="">{icon && icon}</View>
//           <TextInput
//             secureTextEntry={secureTextEntry}
//             placeholder={placeholder}
//             placeholderTextColor="#9B9B9B"
//             keyboardType={keyboardType as KeyboardTypeOptions}
//             // onBlur={() => {
//             //   setFocused(false);
//             // }}
//             onChangeText={handleChangeText}
//             onBlur={handleBlur}
//             // onFocus={() => {
//             //   setFocused(true);
//             // }}
//             editable={editable}
//             onFocus={onFocus}
//             // onChangeText={onChangeText}
//             value={value}
//             textAlign={isArabic ? "right" : undefined} // Right-align for Arabic
//             style={{
//               fontSize: rS(14),
//               height: rV(44),
//               flex: 1,
//               padding: 2,
//               color: "#000",
//             }}
//           />
//         </View>

//         <>
//           {error && (
//             <Text
//               className=" text-red  px-2 font-[PoppinsLight]"
//               style={{ fontSize: rS(10) }}
//             >
//               {error}
//             </Text>
//           )}
//         </>
//       </View>
//     </>
//   );
// };

// export default CustomInput;


import { rS, rV } from "@/src/lib/responsivehandler";
import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type InputType = {
  label?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPostion?: string;
  value?: string;
  onChangeText?: (text?: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  primary?: boolean;
  whiteBg?: boolean;
  width?: number;
  multiline?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  editable?: boolean;
  isLoading?: boolean;
  isArabic?: boolean;
  normalize?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: () => void;
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode";
};

const CustomInput = ({
  label,
  icon,
  iconPostion,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
  primary,
  whiteBg,
  error,
  editable = true,
  onFocus,
  isArabic,
  onBlur,
  multiline,
  isLoading,
  normalize = false,
  autoCapitalize = "none",
  returnKeyType = "done",
  onSubmitEditing,
  textContentType,
}: InputType) => {
  const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (!icon && !iconPostion) {
      return "flex-row";
    }
    if (icon && iconPostion) {
      if (iconPostion === "left") {
        return "flex-row";
      } else {
        if (iconPostion === "right") {
          return "flex-row-reverse";
        }
      }
    }
  };

  const getBgColor = () => {
    if (primary)
      return `border ${
        error ? "border-red-500" : "border-[#EAEAEA]"
      } bg-white`;
    if (whiteBg)
      return `bg-[#ffffff] border ${
        error ? "border-red-500" : "border-divider"
      }`;
  };

  const handleChangeText = (text: string) => {
    const processed = normalize ? text.trim() : text;
    onChangeText?.(processed);
  };

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) {
      const finalValue = value?.trim();
      if (value !== finalValue) {
        onChangeText?.(finalValue);
      }
      onBlur();
    }
  };

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  // Set appropriate keyboard and input types
  const getKeyboardType = (): KeyboardTypeOptions => {
    if (keyboardType) return keyboardType as KeyboardTypeOptions;
    if (textContentType === "emailAddress") return "email-address";
    if (textContentType === "telephoneNumber") return "phone-pad";
    return "default";
  };

  const getAutoCapitalize = () => {
    if (textContentType === "emailAddress" || textContentType === "username")
      return "none";
    if (
      textContentType === "name" ||
      textContentType === "givenName" ||
      textContentType === "familyName"
    )
      return "words";
    return autoCapitalize;
  };

  return (
    <>
      <View className="my-1">
        <>
          {label && (
            <Text
              className="mb-2 font-[PoppinsMedium] text-[#101828]"
              style={{ fontSize: rS(12) }}
            >
              {label}
            </Text>
          )}
        </>
        <View
          className={`rounded-2xl ${getBgColor()} items-center px-3 ${getFlexDirection()} ${
            focused ? "border-primary" : ""
          }`}
          style={{ height: multiline ? rV(80) : rV(40) }}
        >
          <View className="">{icon && icon}</View>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor="#9B9B9B"
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            autoCorrect={false}
            spellCheck={false}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            textContentType={textContentType}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            onFocus={handleFocus}
            editable={editable}
            value={value}
            multiline={multiline}
            textAlign={isArabic ? "right" : undefined}
            textAlignVertical={multiline ? "top" : "center"}
            blurOnSubmit={!multiline}
            style={{
              fontSize: rS(14),
              height: multiline ? rV(76) : rV(36),
              flex: 1,
              padding: 2,
              color: "#000000",
              backgroundColor: "#ffffff",
              paddingTop: multiline ? 8 : 0,
            }}
          />
        </View>

        <>
          {error && (
            <Text
              className="text-red-500 px-2 font-[PoppinsLight]"
              style={{ fontSize: rS(10) }}
            >
              {error}
            </Text>
          )}
        </>
      </View>
    </>
  );
};

export default CustomInput;