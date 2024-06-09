import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import CommunityStats from "../../components/Home/CommunityStats";
import ProductCard from "../../components/Home/ProductCard";
import { Colors } from "../../constants/Colors";

export default function home() {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.bg,
      }}
    >
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Category */}
      <Category />

      {/* Popular List Card */}
      <ProductCard />

      {/* Community Stats */}
      <CommunityStats />

      {/* Category */}
      <Category />
    </ScrollView>
  );
}
