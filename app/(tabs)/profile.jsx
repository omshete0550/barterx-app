import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
import { Colors } from "../../constants/Colors";

export default function profile() {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.bg,
        height: '100%'
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          color: '#fff'
        }}
      >
        Profile
      </Text>

      {/* UserIntro */}
      <UserIntro />

      {/* MenuList */}
      <MenuList />
    </View>
  );
}
