import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "expo-router";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayRemove,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function BarterProduct() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [barterProductList, setBarterProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBarterProduct = async () => {
    setLoading(true);

    setBarterProductList([]);
    const q = query(
      collection(db, "ProductList"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapShot = await getDocs(q);

    let productsWithSwapList = [];
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      if (data.swapList && data.swapList.length > 0) {
        productsWithSwapList.push({
          id: doc.id,
          ...data,
        });
      }
    });

    setLoading(false);
    setBarterProductList(productsWithSwapList);
  };

  useEffect(() => {
    getBarterProduct();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Swapped Product",
      headerStyle: { backgroundColor: Colors.bg },
      headerTitleStyle: { color: Colors.white },
    });
  }, []);

  const handleDecline = async (productId, swappedItem) => {
    const productRef = doc(db, "ProductList", productId);

    await updateDoc(productRef, {
      swapList: arrayRemove(swappedItem),
    });

    getBarterProduct();
  };

  // const handleAccept = async (productId, swappedItem) => {
  //   console.log(productId);
  //   console.log(swappedItem);
  //   try {

  //     // Create documents to add to the SwappedProduct collection
  //     const swappedProductData1 = {
  //       userEmail: user?.primaryEmailAddress?.emailAddress,
  //       productId: productId,
  //       swappedItem: {
  //         name: swappedItem.name,
  //         imageUrl: swappedItem.imageUrl,
  //       },
  //       swappedWithUser: swappedItem.userEmail,
  //       timestamp: new Date(),
  //     };

  //     const swappedProductData2 = {
  //       userEmail: swappedItem.userEmail,
  //       productId: swappedItem.id,
  //       swappedItem: {
  //         name: swappedItem.name,
  //         imageUrl: swappedItem.imageUrl,
  //       },
  //       swappedWithUser: user?.primaryEmailAddress?.emailAddress,
  //       timestamp: new Date(),
  //     };

  //     // Add both products to the SwappedProduct collection
  //     await addDoc(collection(db, "SwappedProduct"), swappedProductData1);
  //     await addDoc(collection(db, "SwappedProduct"), swappedProductData2);

  //     // Remove both products from the ProductList collection
  //     const productRef = doc(db, "ProductList", productId);
  //     await deleteDoc(productRef);

  //     const swappedProductRef = doc(db, "ProductList", swappedItem.id);
  //     await deleteDoc(swappedProductRef);

  //     Alert.alert(
  //       "Swap Successful",
  //       "The products have been successfully swapped."
  //     );
  //     getBarterProduct();
  //   } catch (error) {
  //     console.error("Error swapping products: ", error);
  //     Alert.alert(
  //       "Error",
  //       `An error occurred while swapping the products: ${error.message}`
  //     );
  //   }
  // };

  const handleAccept = async (productId, swappedItem) => {
    console.log(productId);
    console.log(swappedItem);
    try {
      // Fetch the full product details for the product being swapped
      const productRef = doc(db, "ProductList", productId);
      const productDoc = await getDoc(productRef);
      if (!productDoc.exists()) {
        throw new Error("Product not found");
      }
      const productData = productDoc.data();

      // Fetch the full product details for the barter product
      const barterProductRef = doc(db, "ProductList", swappedItem.id);
      const barterProductDoc = await getDoc(barterProductRef);
      if (!barterProductDoc.exists()) {
        throw new Error("Barter product not found");
      }
      const barterProductData = barterProductDoc.data();

      // Create documents to add to the SwappedProduct collection
      const swappedProductData1 = {
        userEmail: user?.primaryEmailAddress?.emailAddress, // omshete0550
        productId: productId,
        productDetails: productData, // sem 5
        swappedItem: {
          name: swappedItem.name, // sem 6
          imageUrl: swappedItem.imageUrl,
        },
        swappedWithUser: swappedItem.userEmail,
        timestamp: new Date(),
      };

      console.log(productData);

      const swappedProductData2 = {
        userEmail: swappedItem.userEmail, // omshete012
        productId: swappedItem.id,
        productDetails: barterProductData, // sem 6
        swappedItem: {
          name: productData.name,
          imageUrl: productData.imageUrl,
        },
        swappedWithUser: user?.primaryEmailAddress?.emailAddress,
        timestamp: new Date(),
      };

      // Add both products to the SwappedProduct collection
      await addDoc(collection(db, "SwappedProduct"), swappedProductData1);
      await addDoc(collection(db, "SwappedProduct"), swappedProductData2);

      // Remove both products from the ProductList collection
      await deleteDoc(productRef);
      await deleteDoc(barterProductRef);

      Alert.alert(
        "Swap Successful",
        "The products have been successfully swapped."
      );
      getBarterProduct();
    } catch (error) {
      console.error("Error swapping products: ", error);
      Alert.alert(
        "Error",
        `An error occurred while swapping the products: ${error.message}`
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        padding: 20,
      }}
    >
      {barterProductList?.length > 0 && loading == false ? (
        <FlatList
          data={barterProductList}
          refreshing={loading}
          onRefresh={getBarterProduct}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 20,
              }}
            >
              {item.swapList.map((swappedItem, index) => (
                <View
                  key={index}
                  style={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                    borderRadius: 10,
                    backgroundColor: Colors.GRAY,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 21,
                      fontFamily: "outfit-medium",
                      textAlign: "center",
                    }}
                  >
                    Your Item: {item.name}
                  </Text>
                  <Image
                    source={{ uri: swappedItem.imageUrl }}
                    style={{
                      height: 300,
                      width: "100%",
                      borderRadius: 8,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "outfit",
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      Swapped with: {swappedItem.name}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "outfit",
                        fontSize: 16,
                      }}
                    >
                      Barter Product: {swappedItem.barterProduct}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleAccept(item.id, swappedItem)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        backgroundColor: Colors.green,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.lightGray,
                          fontFamily: "outfit-medium",
                        }}
                      >
                        Accept
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDecline(item.id, swappedItem)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        backgroundColor: "red",
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "outfit-medium",
                        }}
                      >
                        Decline
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
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
          No Product Found!
        </Text>
      )}
    </View>
  );
}
