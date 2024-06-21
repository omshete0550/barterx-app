import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

export default function UserIntro() {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: Colors.GRAY,
        padding: 20,
        borderRadius: 10
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 99 }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          marginTop: 10,
          color: "#fff",
        }}
      >
        {user?.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 16, color: "#fff", marginTop: 5 }}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
