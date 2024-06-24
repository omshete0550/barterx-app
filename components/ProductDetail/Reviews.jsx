import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ product }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "ProductList", product?.id);

    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        username: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Comment Added Successfully", ToastAndroid.BOTTOM);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          color: Colors.white
        }}
      >
        Reviews
      </Text>

      <View>
        <Rating
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 15 }}
          imageSize={20}
        />
        <TextInput
          numberOfLines={4}
          onChangeText={(value) => setUserInput(value)}
          placeholder="Write your comments...."
          placeholderTextColor={Colors.white}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
            color: Colors.white
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          style={{
            marginTop: 15,
            backgroundColor: Colors.green,
            padding: 10,
            borderRadius: 6,
          }}
          onPress={() => onSubmit()}
        >
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              color: Colors.lightGray,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {product?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginTop: 30,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: item?.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: "#fff",
                }}
              >
                {item.username}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text style={{ color: Colors.white }}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
