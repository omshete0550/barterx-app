import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  const getSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getSliderList();
  }, []);

  return (
    <View style={{
      marginTop: 30
    }}>
      {/* <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 10,
          color: '#fff'
        }}
      >
        #Special For You
      </Text> */}

      <FlatList
        data={sliderList}
        horizontal={true}
        style={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15
            }}
          />
        )}
      />
    </View>
  );
}
