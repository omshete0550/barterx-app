import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Colors } from "@/constants/Colors";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoImage}
      />

      <Image
        source={require("../assets/images/login.png")}
        style={styles.bgImage}
      />

      <View style={styles.subcontainer}>
        <Text style={styles.heading}>
          Your Ultimate{" "}
          <Text
            style={{
              color: Colors.blue,
            }}
          >
            {" "}
            Community BarterX{" "}
          </Text>
          App
        </Text>

        <Text style={styles.desc}>
          We connect you to people around you to barterX items with Our feed is
          filled with listed items by varoius users all over India in 8
          categories
        </Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{
              fontFamily: "outfit",
              color: "#fff",
              textAlign: "center",
              fontSize: 17,
            }}
          >
            Lets Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 40,
    objectFit: "contain",
  },
  bgImage: {
    width: "100%",
    height: 230,
    marginTop: 50,
    objectFit: "cover",
  },
  subcontainer: {
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 20,
  },
  desc: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 15,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 20,
  },
});
