import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreProduct from "../../components/Explore/ExploreProduct";
import * as ImagePicker from "expo-image-picker";

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

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      console.log(pickerResult);
      // You can handle the picked image here
      // For example, you can upload it to your server
    }
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
          textAlign: "center",
        }}
      >
        Explore More
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: Colors.GRAY,
          marginVertical: 20,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AntDesign name="search1" size={24} color={Colors.green} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={Colors.white}
            style={{
              fontFamily: "outfit",
              fontSize: 16,
            }}
          />
        </View>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <AntDesign name="camera" size={24} color={Colors.green} />
        </TouchableOpacity>
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
