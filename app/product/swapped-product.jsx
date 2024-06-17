import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "expo-router";

export default function SwappedProduct() {
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  const getUserSwappedProduct = async () => {
    try {
      setProductList([]);
      const q = query(
        collection(db, "SwappedProduct"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        setProductList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching swapped products:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Swapped Product",
      headerStyle: { backgroundColor: Colors.GRAY },
      headerTitleStyle: { color: "#fff" },
    });

    getUserSwappedProduct();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.bg,
        padding: 20,
      }}
    >
      <Text
        style={{
          marginTop: 20,
          fontFamily: "outfit-bold",
          color: "#fff",
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        Swapped Product
      </Text>

      <FlatList
        data={productList}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              backgroundColor: Colors.GRAY,
              padding: 15,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: item?.productDetails?.imageUrl }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 99,
              }}
            />

            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: "outfit-medium",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Your Item: {item?.productDetails?.name}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  fontFamily: "outfit-medium",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Swapped With: {item?.swappedItem?.name}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
