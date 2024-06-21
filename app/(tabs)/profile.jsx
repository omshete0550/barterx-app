import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
import { Colors } from "../../constants/Colors";

export default function profile() {
  return (
    <View
      style={{
        backgroundColor: Colors.bg,
        height: "100%",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          textAlign: "center",
          color: "#fff",
          paddingTop: 50,
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
