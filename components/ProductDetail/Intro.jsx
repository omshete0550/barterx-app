import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ product }) {
  const router = useRouter();
  const { user } = useUser();

  const onDelete = () => {
    Alert.alert(
      "Do you want to delete?",
      "Do you really want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteProduct(),
        },
      ]
    );
  };

  const deleteProduct = async () => {
    await deleteDoc(doc(db, "ProductList", product?.id));
    router.back();
    ToastAndroid.show("Product Deleted!", ToastAndroid.LONG);
  };

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart" size={40} color="white" />
      </View>
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          padding: 20,
          // backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -10,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 26,
                fontFamily: "outfit-bold",
                color: Colors.GOLD,
              }}
            >
              {product?.name}
            </Text>

            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontFamily: "outfit",
                color: "#fff",
              }}
            >
              Onwer: {product?.owner}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontFamily: "outfit",
                color: "#fff",
              }}
            >
              Required: {product?.barterProduct}
            </Text>
          </View>

          {user?.primaryEmailAddress?.emailAddress == product?.email && (
            <TouchableOpacity
              onPress={() => onDelete()}
              style={{
                width: 45,
                height: 45,
                backgroundColor: "#f2f2f3",
                borderRadius: 99,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
