import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
export default function MenuList() {
  const Menu = [
    {
      id: 1,
      name: "Add Product",
      icon: require("./../../assets/images/addProduct.png"),
      path: "",
    },
    {
      id: 2,
      name: "My Products",
      icon: require("./../../assets/images/myProduct.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "",
    },
  ];

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={Menu}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,

              margin: 10,
              backgroundColor: Colors.GRAY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 16,
                flex: 1,
                color: '#fff'
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
