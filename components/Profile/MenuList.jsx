import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function MenuList() {
  const Menu = [
    {
      id: 1,
      name: "Add Product",
      // icon: require("./../../assets/images/addProduct.png"),
      icon: "add-business",
      path: "/product/add-product/",
    },
    {
      id: 2,
      name: "My Products",
      // icon: require("./../../assets/images/myProduct.png"),
      icon: "check-box",
      path: "/product/my-product/",
    },
    {
      id: 3,
      name: "Request Products",
      // icon: require("./../../assets/images/myProduct.png"),
      icon: "request-quote",
      path: "/product/barter-product/",
    },
    {
      id: 4,
      name: "Swapped Products",
      // icon: require("./../../assets/images/myProduct.png"),
      icon: "swap-horiz",
      path: "/product/swapped-product/",
    },
    {
      id: 5,
      name: "Share App",
      // icon: require("./../../assets/images/share.png"),
      icon: "share",
      path: "share",
    },
    {
      id: 6,
      name: "Logout",
      // icon: require("./../../assets/images/logout.png"),
      icon: "logout",
      path: "logout",
    },
  ];

  const router = useRouter();
  const { signOut } = useAuth();

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download URL:",
      });
      return;
    }
    router.push(item.path);
  };

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={Menu}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
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
            <MaterialIcons name={item.icon} size={48} color={Colors.green} />
            {/* <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            /> */}

            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 16,
                flex: 1,
                color: "#fff",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
