import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/ProductDetail/Intro';
import ActionButton from '../../components/ProductDetail/ActionButton';
import About from '../../components/ProductDetail/About';
import Reviews from '../../components/ProductDetail/Reviews';
import BarterProductList from '../../components/ProductDetail/BarterProductList';

export default function ProductDetail() {
    const { productid } = useLocalSearchParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);

    const getProductDetailById = async () => {
        setLoading(true);
        const docRef = doc(db, 'ProductList', productid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
            console.log('No such Product:');
        }
        setLoading(false);
    };

    useEffect(() => {
        getProductDetailById();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <ScrollView >
            {product && (
                <View style={{
                    backgroundColor: Colors.bg
                }}>
                    {/* Intro */}
                    <Intro product={product} />

                    {/* Action Button */}
                    <ActionButton product={product} />

                    {/* About Section */}
                    <About product={product} />


                    {/* Barter Product Table */}
                    <View style={{
                        padding: 20
                    }} >
                        <Text
                            style={{
                                fontFamily: "outfit-bold",
                                fontSize: 20,
                                color: Colors.white,
                                marginBottom: 20
                            }}
                        >
                            Barter Product
                        </Text>
                        <BarterProductList />
                    </View>

                    {/* Reviews */}
                    <Reviews product={product} />
                </View>
            )}
        </ScrollView>
    );
}
