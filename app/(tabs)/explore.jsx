import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreProduct from "../../components/Explore/ExploreProduct";

export default function explore() {
  const [productList, setProductList] = useState([]);

  const getProductListByCategory = async (category) => {
    setProductList([]);
    const q = query(
      collection(db, "ProductList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setProductList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.bg,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 30,
          color: "#fff",
        }}
      >
        Explore More
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
          backgroundColor: "#fff",
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          marginBottom: 30,
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        />
      </View>
      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getProductListByCategory(category)}
      />

      {/* Product List */}
      <ExploreProduct productList={productList} />
    </View>
  );
}
