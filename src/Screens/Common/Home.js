import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, RefreshControl, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getUserData } from "../../firebaseCalls";

import { getAuth, signOut } from 'firebase/auth';

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

import { styles } from '../../styles';
import Transaction from '../../Components/Transaction';
import { FlatList } from 'native-base';

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
                        <Image source={require("../../Assets/LeafLogo.png")} style={styles.leafLogo}/>
                        <Text>{userData.email}</Text>
                        <Text>${userData.balance.toFixed(2)}</Text>
                        <Text>Árboles plantados: {userData.contributedTrees}</Text><Text></Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Target') }} style={[styles.button]}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>ENVIAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('QR')} style={[styles.button]}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>RECIBIR - QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Plant')} style={[styles.button]}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>PLANTAR</Text>
                        </TouchableOpacity>
                        <Text>Tus últimas transacciones: </Text>
                        <FlatList
                            data={userData.lastTransactions}
                            renderItem={renderItem}
                            keyExtractor={item => {
                                if(item.id) return item.id
                                return 0;
                            }}
                        />
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
                    </>
                }
            </View>
        </ScrollView>
    );
};

export default Home;