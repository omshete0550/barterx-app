import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ProductListCard from "../../components/ProductList/ProductListCard";
import { useNavigation } from "expo-router";

export default function MyProduct() {
  const { user } = useUser();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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

    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Product",
      headerStyle: { backgroundColor: Colors.bg },
      headerTitleStyle: { color: Colors.white },
    });
  }, [user]);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.bg,
        height: "100%",
      }}
    >
      {productList?.length > 0 && loading == false ? (
        <FlatList
          refreshing={loading}
          onRefresh={getUserProduct}
          data={productList}
          renderItem={({ item, index }) => (
            <ProductListCard product={item} key={index} />
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
          No Product Posted Yet!
        </Text>
      )}
    </View>
  );
}
