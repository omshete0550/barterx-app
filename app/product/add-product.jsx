import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddProduct() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [desiredProduct, setDesiredProduct] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const snapShot = await getDocs(collection(db, "Category"));

      snapShot.forEach((doc) => {
        setCategoryList((prev) => [
          ...prev,
          {
            label: doc.data().name,
            value: doc.data().name,
          },
        ]);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onAddProduct = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "barterx/" + fileName);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("file uploaded");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          saveProductDetail(downloadUrl);

          // Reset fields
          setProductName("");
          setProductDesc("");
          setDesiredProduct("");
          setProductCondition("");
          setProductCategory("");
          setImage(null);
          setSelectedDate(new Date());

          // Navigate back
          navigation.goBack();
        });
      });

    setLoading(false);
  };

  const saveProductDetail = async (imageUrl) => {
    await setDoc(doc(db, "ProductList", Date.now().toString()), {
      name: productName,
      about: productDesc,
      barterProduct: desiredProduct,
      category: productCategory,
      condition: productCondition,
      owner: user?.fullName,
      contact: user?.phoneNumbers,
      dateOfPurchase: selectedDate,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });

    setLoading(false);
    ToastAndroid.show("New Product Added!", ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Publish Product",
      headerStyle: { backgroundColor: Colors.bg },
      headerTitleStyle: { color: Colors.white },
    });

    getCategoryList();
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.bg,
        height: "100%",
        padding: 20,
      }}
    >
      {/* <Text style={{ color: Colors.white, fontSize: 30, fontFamily: "outfit-bold" }}>
        Publish Product
      </Text> */}
      <Text style={{ color: '#ccc', fontFamily: "outfit" }}>
        To start swapping, all you need is a name, required product, and file.
      </Text>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <TextInput
          onChangeText={(v) => setProductName(v)}
          placeholder="Product Name"
          placeholderTextColor="white"
          style={{
            padding: 10,
            color: "white",
            fontSize: 17,
            borderRadius: 5,
            marginTop: 10,
            fontFamily: "outfit",
            backgroundColor: Colors.lightGray,
          }}
        />
        <TextInput
          placeholder="Product Description"
          onChangeText={(v) => setProductDesc(v)}
          placeholderTextColor="white"
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            color: "white",
            fontSize: 17,
            borderRadius: 5,
            marginTop: 20,
            fontFamily: "outfit",
            backgroundColor: Colors.lightGray,
            height: 100,
          }}
        />
        <TextInput
          placeholder="Desired Product Name"
          onChangeText={(v) => setDesiredProduct(v)}
          placeholderTextColor="white"
          style={{
            padding: 10,
            color: "white",
            fontSize: 17,
            borderRadius: 5,
            marginTop: 20,
            fontFamily: "outfit",
            backgroundColor: Colors.lightGray,
          }}
        />

        <View
          style={{
            color: Colors.white,
            borderRadius: 5,
            marginTop: 20,
            fontFamily: "outfit",
            backgroundColor: Colors.lightGray,
            padding: 10
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setProductCondition(value)}
            items={[
              { label: "Used", value: "used" },
              { label: "Mint", value: "mint" },
              { label: "Nearly New", value: "nearly new" },
            ]}
            placeholder={{
              label: "Select Condition",
              value: null,
              color: Colors.white,
            }}
            style={{
              inputAndroid: { color: "white" },
              inputIOS: { color: "white" },
            }}
          />
        </View>
        <View
          style={{
            color: "white",
            borderRadius: 5,
            marginTop: 20,
            fontFamily: "outfit",
            backgroundColor: Colors.lightGray,
            padding: 10
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setProductCategory(value)}
            items={categoryList}
            placeholder={{
              label: "Select Category",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputAndroid: { color: "white" },
              inputIOS: { color: "white" },
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.lightGray,
            padding: 10,
            borderRadius: 5,
            // alignItems: "center",
          }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: "white" }}>Select Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <RNDateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            textColor="white"
          />
        )}
        <Text style={{ color: "white", marginTop: 10 }}>
          Selected Date: {selectedDate.toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        disabled={loading}
        style={{
          marginTop: 30,
          backgroundColor: Colors.green,
          padding: 15,
          borderRadius: 5,
        }}
        onPress={() => onAddProduct()}
      >
        {loading ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <Text
            style={{
              color: Colors.lightGray,
              textAlign: "center",
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
          >
            Publish Product
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
