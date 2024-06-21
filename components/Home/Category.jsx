import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryCard from "../Home/CategoryCard";
import { useRouter } from "expo-router";
export default function Category({ explore, onCategorySelect }) {
  const router = useRouter();

  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push("/productlist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <View>
      {!explore && (
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontFamily: "outfit-bold",
              color: "#fff",
            }}
          >
            Category
          </Text>
          <Text style={{ color: Colors.green, fontFamily: "outfit-medium", textDecorationLine: 1, fontSize: 16 }}>
            See All
          </Text>
        </View>
      )}

      <FlatList
        data={categoryList}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <CategoryCard
            category={item}
            key={index}
            onCategoryPress={(category) => onCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
}
