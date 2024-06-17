import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const ProductListModal = ({
  visible,
  products,
  onClose,
  productDetailName,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useUser();

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    Alert.alert(
      "Confirm Swap",
      `Do you want to swap ${product.name}?`,
      [
        {
          text: "Cancel",
          onPress: () => setSelectedProduct(null),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleConfirmSwap(product),
        },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmSwap = async (selectedProduct) => {
    try {
      // Reference to the specific product document
      const productRef = doc(db, "ProductList", productDetailName.id);

      // Add the selected product to the swapList array of the clicked product
      await updateDoc(productRef, {
        swapList: arrayUnion({
          id: selectedProduct.id,
          name: selectedProduct.name,
          barterProduct: selectedProduct.barterProduct,
          imageUrl: selectedProduct.imageUrl,
          ownerEmail: productDetailName.email, // Include owner's email
          userEmail: user?.primaryEmailAddress?.emailAddress, // Include current user's email
        }),
      });

      // Clear the selected product
      setSelectedProduct(null);
      Alert.alert("Success", `${selectedProduct.name} swapped successfully!`);
    } catch (error) {
      console.error("Error swapping product:", error);
      Alert.alert("Error", "Failed to swap product. Please try again.");
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={{ color: "white" }}>Required: {item.barterProduct}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: "#fff",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Your Products
          </Text>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="closecircle" size={28} color={Colors.orange} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.bg,
    borderRadius: 15,
    width: "90%",
    maxHeight: "80%",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.GRAY,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 99,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
});

export default ProductListModal;
