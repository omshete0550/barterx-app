import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.GRAY,
      }}
    >
      <View>
        <Image
          source={require("../assets/images/logo_new.png")}
          style={{
            width: 200,
            height: 50,
            marginTop: 50,
          }}
        />
      </View>

      <View
        style={{
          padding: 20,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            fontSize: 75,
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: Colors.orange,
          }}
        >
          Simple Way
        </Text>
        <Text
          style={{
            fontSize: 75,
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: Colors.orange,
          }}
        >
          to barter
        </Text>
        <Text
          style={{
            fontSize: 75,
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: Colors.orange,
          }}
        >
          the items
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontFamily: "outfit",
            color: Colors.white,
            marginTop: 50,
          }}
        >
          Our feed is filled with listed items by various users all over India
          in 8 categories
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.green,
            padding: 16,
            display: "flex",
            borderRadius: 99,
            marginTop: 50,
          }}
          onPress={() => router.push("LoginScreen")}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: Colors.lightGray,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
