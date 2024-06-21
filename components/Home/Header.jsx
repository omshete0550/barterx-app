import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.GRAY,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />
          <View>
            <Text style={{ color: "#fff" }}>Welcome,</Text>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "outfit-medium",
                color: "#fff",
              }}
            >
              {user?.fullName}
            </Text>
          </View>
        </View>

        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 150,
            height: 45,
          }}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
          backgroundColor: Colors.lightGray,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.white} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="white"
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.white
          }}
        />
      </View>
    </View>
  );
}
