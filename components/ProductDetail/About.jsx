import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react"; // Import useState hook
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ProductListModal from "./ProductListModal";

export default function About({ product }) {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchUserProducts = async () => {
    const q = collection(db, "ProductList");
    const querySnapShot = await getDocs(q);

    let productsArray = [];
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      if (data.email === user?.primaryEmailAddress?.emailAddress) {
        productsArray.push({
          id: doc.id,
          ...data,
        });
      }
    });

  

    setProducts(productsArray);
  };

  const handleBarterNow = async () => {
    await fetchUserProducts();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Fetch user products on component mount
    fetchUserProducts();
  }, []);

  return (
    <View
      style={{
        padding: 20,
        // backgroundColor: "#FFFFFF",
        // height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          color: "#fff",
        }}
      >
        About
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          lineHeight: 25,
          fontFamily: "outfit",
          color: "#fff",
        }}
      >
        {product?.about}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Required: {product?.barterProduct}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Condition: {product?.condition}
          </Text>
        </View>

        {user?.primaryEmailAddress?.emailAddress !== product?.email && (
          <TouchableOpacity
            onPress={handleBarterNow}
            style={{
              backgroundColor: Colors.orange,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: "#fff",
              }}
            >
              Barter Now
            </Text>
          </TouchableOpacity>
        )}
        {/* Modal to display product details */}
        <ProductListModal
          visible={modalVisible}
          products={products}
          onClose={closeModal}
          productDetailName={product}
        />
      </View>
    </View>
  );
}
