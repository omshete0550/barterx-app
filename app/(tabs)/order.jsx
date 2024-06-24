import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function order() {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: Colors.bg,
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
        Notifications
      </Text>
      <Text
        style={{
          color: Colors.green,
          fontFamily: "outfit-bold",
          fontSize: 50,
          textAlign: "center",
          marginTop: '50%'
        }}
      >
        Coming Soon!
      </Text>
    </View>
  );
}
