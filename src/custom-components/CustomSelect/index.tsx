// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import React from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { Image } from "react-native";

// type Props = {
//   label?: string;
//   setOpenDropDown?: (openDropDown: boolean) => void;
//   openDropDown?: boolean;
//   selected?: string | null;
//   placeholder?: string;
//   onPress?: () => void;
//   dataItem:any;
// };

// const CustomRegisterSelect = ({
//   label,
//   setOpenDropDown,
//   openDropDown,
//   selected,
//   placeholder,
//   onPress,
//   dataItem,
// }: Props) => {
//   return (
//     <>
//       {label && <Text className="text-xs font-[Urbanist]  my-2">{label}</Text>}
//       <TouchableOpacity
//         className="h-14 bg-[#F5F5F5]  rounded-xl justify-center p-3 mb-5"
//         onPress={() => {
//           setOpenDropDown?.(!openDropDown);
//         }}
//         // onPress={toggleDropDown}
//       >
//         <View className="flex-row items-center justify-between">
//           <Text className="font-[400] text-sm text-[#23232399]  font-[Urbanist] leading-[13]">
//             {/* {selected
//               ? `${selected.carrier_name} - ${selected.delivery_time}`
//               : `${itemSelected}`} */}
//             {selected ? selected : placeholder}
//           </Text>
//           {selected ? null : (
//             <View className="">
//               <AntDesign name="caretdown" size={16} color="#1E1D2F" />
//             </View>
//           )}
//         </View>
//       </TouchableOpacity>
//       {openDropDown && (
//         <ScrollView
//           className="border border-[#E8E8E8] bg-white p-3  rounded-lg h-auto "
//           nestedScrollEnabled={true}
//           style={{ maxHeight: 200 }}
//         >
//           {dataItem.map((item: any) => (
//             <TouchableOpacity
//               className="flex-row items-center justify-between my-1"
//               onPress={onPress}
//             >
//               <View>
//                 <Text className="font-[400] text-xs  font-[Urbanist]">
//                   {item?.value}
//                 </Text>
//                 <Text className="font-[400] text-xs  font-[Urbanist]">
//                   {item?.price && item?.price}
//                 </Text>
//               </View>

//               {/* <View className="h-[40px] w-[40px]  rounded-full">
//               <Image
//                 source={{ uri: image }}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </View> */}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </>
//   );
// };

// export default CustomRegisterSelect;

import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

interface Props {
  label?: string;
  setOpenDropDown: (open: boolean) => void;
  openDropDown: boolean;
  selected: Item | null;
  setSelected: (item: Item | null) => void;
  placeholder: string;
  dataItem: Item[];
  whiteBg?: boolean;
  primary?: boolean;
  style?: ViewStyle;
}

const CustomSelect: React.FC<Props> = ({
  label,
  setOpenDropDown,
  openDropDown,
  selected,
  setSelected,
  placeholder,
  dataItem,
  primary,
  whiteBg,
  style,
}) => {
  const handleItemPress = (item: Item) => {
    setSelected(item);
    setOpenDropDown(false);
  };

  const getBgColor = () => {
    if (primary) return "border border-[#EAEAEA] bg-onsurface";
    if (whiteBg) return "bg-[#ffffff] border border-divider";
  };

  return (
    <>
      {label && (
        <Text
          className="mb-2 font-[PoppinsMedium] text-[#101828]"
          style={{ fontSize: rS(12) }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={` justify-center p-3 rounded-2xl ${getBgColor()} `}
        onPress={() => setOpenDropDown(!openDropDown)}
        style={{ height: rV(40) }}
        // style={style}
      >
        <View className="flex-row items-center justify-between">
          <Text
            className="  font-[PoppinsRegular]"
            style={{ fontSize: rS(12) }}
          >
            {selected ? selected.title : placeholder}
          </Text>
          <View className="">
            <AntDesign
              name={openDropDown ? "up" : "down"}
              size={20}
              color="#1E1D2F"
            />
          </View>
        </View>
      </TouchableOpacity>
      {openDropDown && (
        <ScrollView
          className=" p-3 rounded-lg h-auto"
          nestedScrollEnabled={true}
          style={{ maxHeight: 200 }}
        >
          {dataItem.map((item: Item) => (
            <TouchableOpacity
              key={item.value}
              style={{ height: rV(40) }}
              className="flex-row items-center border border-[#E8E8E8] justify-between my-1 p-2 rounded-2xl "
              onPress={() => handleItemPress(item)}
            >
              <View>
                <Text
                  className="font-[PoppinsRegular]"
                  style={{ fontSize: rS(12) }}
                >
                  {item.title}
                </Text>
                {item.price && (
                  <Text className=" text-xs font-[PoppinsRegular]">
                    {item.price}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default CustomSelect;
