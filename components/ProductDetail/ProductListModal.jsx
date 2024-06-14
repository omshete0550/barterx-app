import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const ProductListModal = ({ visible, products, onClose }) => {
  if (!visible) return null;

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
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
    paddingVertical: 40,
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
