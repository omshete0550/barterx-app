import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PopularProductCard from "./PopularProductCard";

export default function ProductCard() {
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    setProductList([]);
    const q = query(collection(db, "ProductList"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setProductList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
          Popular Products
        </Text>
        <Text style={{ color: Colors.orange, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>

      <FlatList
        data={productList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularProductCard product={item} key={index} />
        )}
      />
    </View>
  );
}
