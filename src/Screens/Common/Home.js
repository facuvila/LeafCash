import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, RefreshControl, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getUserData } from "../../firebaseCalls";

import { getAuth, signOut } from 'firebase/auth';

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

import { styles } from '../../styles';
import Transaction from '../../Components/Transaction';
import HomeInfo from '../../Components/HomeInfo';
import { Avatar, FlatList, HStack } from 'native-base';
import { normalizeEmail } from '../../helpers';

function Home() {
    const userData = useStore();
    const dispatch = useDispatch();
    
    const auth = getAuth();
    const user = auth.currentUser;

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const data = await getUserData(user.uid)
        dispatch({type: types.build, user: data})
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }) => (
        <Transaction data={item}/>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {!userData.email ? <Text>CARGANDO LEAF...</Text> : 
                    <>
                        <Text style={{paddingTop: 100, fontWeight: 'bold'}}>Bienvenido, {normalizeEmail(userData.email)}! </Text>
                        <HomeInfo/>
                        <HStack space={2} style={{paddingTop: 30}}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Target') }} style={[styles.button]}>
                                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>ENVIAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('QR')} style={[styles.button]}>
                                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>RECIBIR</Text>
                            </TouchableOpacity>
                        </HStack>
                        <Text>Tus últimas transacciones: </Text>
                        <FlatList
                            data={userData.lastTransactions}
                            renderItem={renderItem}
                            keyExtractor={item => {
                                if(item?.id) {return item.id} 
                                return Math.random() * 10000;
                            }}
                        />
                        <HStack space={2}>
                            <TouchableOpacity onPress={() => navigation.navigate('Plant')} style={[styles.button]}>
                                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>PLANTAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                signOut(auth).then(() => {
                                    navigation.navigate('Login');
                                })
                            }}
                            style={[styles.button]}
                            >
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>CERRAR SESION</Text>
                            </TouchableOpacity>
                        </HStack>
                    </>
                }
            </View>
        </ScrollView>
    );
};

export default Home;