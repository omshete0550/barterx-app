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
  const [loading, setLoading] = useState(false);

  const getUserSwappedProduct = async () => {
    try {
      setProductList([]);
      setLoading(true);
      const q = query(
        collection(db, "SwappedProduct"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        setProductList((prev) => [...prev, doc.data()]);
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching swapped products:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Swapped Product",
      headerStyle: { backgroundColor: Colors.bg },
      headerTitleStyle: { color: Colors.white },
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
      {productList?.length > 0 && loading == false ? (
        <FlatList
          data={productList}
          refreshing={loading}
          onRefresh={getUserSwappedProduct}
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
                marginBottom: 20,
              }}
            >
              <Image
                source={{ uri: item?.swappedItem?.imageUrl }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
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
      ) : (
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            color: Colors.green,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Product Swapped Yet!
        </Text>
      )}
    </View>
  );
}
