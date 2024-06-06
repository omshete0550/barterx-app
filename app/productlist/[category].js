import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ProductListCard from '../../components/ProductList/ProductListCard'
import { Colors } from '../../constants/Colors';
export default function ProductListByCategory() {

    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [productList, setProductList] = useState([]);
    const [loadings, setLoadings] = useState(false);

    const getProductListByCategory = async () => {
        setProductList([]);
        setLoadings(true);
        const q = query(collection(db, 'ProductList'), where("category", "==", category));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setProductList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
        })

        setLoadings(false);
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        });

        getProductListByCategory();
    }, [])

    return (
        <View>
            {productList?.length > 0 && loadings == false ? <FlatList
                data={productList}
                onRefresh={getProductListByCategory}
                refreshing={loadings}
                renderItem={({ item, index }) => (
                    <ProductListCard product={item} key={index} />
                )}
            /> :
                loadings ? <ActivityIndicator
                    style={{ marginTop: '60%' }}
                    size={'large'}
                    color={Colors.PRIMARY}
                /> : <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                    color: Colors.PRIMARY,
                    textAlign: 'center',
                    marginTop: '50%'
                }}>No Product Found!</Text>}

        </View>
    )
}