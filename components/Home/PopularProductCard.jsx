import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function PopularProductCard({ product }) {
  return (
    <View
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: 250,
          height: 180,
          borderRadius: 15,
          backgroundColor: '#f3f3f3'
        }}
      />

      <View style={{ marginTop: 7 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
          {product.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 13,
            marginTop: 5,
            color: Colors.GRAY,
          }}
        >
          Owner: {product.owner}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 13, color: Colors.GRAY }}
        >
          Required: {product.barterProduct}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: '#fb5c36',
              color: "#fff",
              fontSize: 13,
              padding: 3,
              borderRadius: 5,
              width: 50,
              height: 25,
              textAlign: 'center',
            }}
          >
            {product.category}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "outfit-bold",
                backgroundColor: Colors.PRIMARY,
                color: "#fff",
                fontSize: 15,
                paddingHorizontal: 25,
                paddingVertical: 10,
                borderRadius: 10,
                
              }}
            >
              Barter Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
