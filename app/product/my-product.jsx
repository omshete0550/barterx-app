import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ProductListCard from "../../components/ProductList/ProductListCard";

export default function MyProduct() {
  const { user } = useUser();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserProduct = async () => {
    setLoading(true);
    setProductList([]);
    const q = query(
      collection(db, "ProductList"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setProductList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });

    setLoading(false);
  };

  useEffect(() => {
    user && getUserProduct();
  }, [user]);

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
          fontSize: 30,
          fontFamily: "outfit-bold",
          color: "#fff",
        }}
      >
        My Products
      </Text>

      <FlatList
        refreshing={loading}
        onRefresh={getUserProduct}
        data={productList}
        renderItem={({ item, index }) => (
          <ProductListCard product={item} key={index} />
        )}
      />
    </View>
  );
}
