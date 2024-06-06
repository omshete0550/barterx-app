import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ product }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/call.png"),
      url: "tel:" + product?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/location.png"),
      url: "tel:" + product?.contact,
    },
    {
      id: 3,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: "tel:" + product?.contact,
    },
    {
      id: 4,
      name: "Meet",
      icon: require("./../../assets/images/meet.png"),
      url: "https://meet.google.com/bph-myji-fin",
    },
  ];

  const onPresshandle = (item) => {
    if (item.name == "Share") {
      Share.share({
        message:
          product?.name +
          "\n Product Name: " +
          product.name +
          "\n Find more details on BarterX App!",
      });
      return;
    }
    Linking.openURL(item.url);
  };
  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPresshandle(item)} key={index}>
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
