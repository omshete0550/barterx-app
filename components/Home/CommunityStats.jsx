import { View, Text } from "react-native";
import React from "react";
import AnimateNumber from "react-native-countup";
import { Colors } from "../../constants/Colors";

export default function CommunityStats() {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 30,
        marginHorizontal: 20,
        backgroundColor: Colors.GRAY,
        borderRadius: 18
      }}
    >
      <Text
        style={{
          marginTop: 10,
          fontSize: 25,
          fontFamily: "outfit-bold",
          color: Colors.white,
          textAlign: 'center'
        }}
      >
        Community Stats
      </Text>

      <View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <AnimateNumber
            initial={10}
            value={1000}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Number of Businesses
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: "flex-end",
          }}
        >
          <AnimateNumber
            initial={100}
            value={1989000}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Total Barter Transaction Volume
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <AnimateNumber
            initial={10}
            value={2737000}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Total Cash Saved By Businesses
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: "flex-end",
          }}
        >
          <AnimateNumber
            initial={10}
            value={2162000}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Total Cash Saved By Charities
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <AnimateNumber
            initial={10}
            value={95}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Number of Charities Supported
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            alignSelf: "flex-end",
          }}
        >
          <AnimateNumber
            initial={10}
            value={2730000}
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: Colors.green,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Total Barter Donations by Businesses
          </Text>
        </View>
      </View>
    </View>
  );
}
