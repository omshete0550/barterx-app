import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Services() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          marginTop: 10,
          fontSize: 20,
          fontFamily: "outfit-bold",
          color: "#fff",
        }}
      >
        Services
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: 15,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            backgroundColor: Colors.GRAY,
            padding: 20,
            borderRadius: 8,
          }}
        >
          <Ionicons name="bag-remove" size={50} color="white" />
          <Text
            style={{
              color: Colors.green,
              fontFamily: "outfit",
            }}
          >
            Hit The Desire
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            backgroundColor: Colors.green,
            padding: 20,
            borderRadius: 8,
          }}
        >
          <AntDesign name="user" size={50} color={Colors.lightGray} />
          <Text
            style={{
              color: Colors.lightGray,
              fontFamily: "outfit",
            }}
          >
            User Reliance
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            backgroundColor: Colors.GRAY,
            padding: 20,
            borderRadius: 8,
          }}
        >
          <FontAwesome name="handshake-o" size={50} color="white" />
          <Text
            style={{
              color: Colors.green,
              fontFamily: "outfit",
            }}
          >
            Assurance
          </Text>
        </View>
      </View>
    </View>
  );
}
