import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import ProductListCard from "./ProductListCard";

export default function ExploreProduct({ productList }) {
  return (
    <ScrollView>
      <FlatList
        data={productList}
        scrollEnabled
        // showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductListCard product={item} key={index} />
        )}
      />
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
}
