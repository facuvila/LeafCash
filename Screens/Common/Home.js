import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, RefreshControl, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from '../../firebase-config';

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

import { LeafBtn } from '../../Components/leafBtn';
import { styles } from '../../styles';

function Home() {
    const userData = useStore();
    const dispatch = useDispatch();
    
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const user = auth.currentUser;
    const functions = getFunctions();

    const getUserData = httpsCallable(functions, 'getUserData');

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUserData({ uid: user.uid })
        .then((result) => {
            dispatch({type: types.build, user: result.data})
        });
        setRefreshing(false);
    }, []);

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
                        <Text>${userData.balance}</Text>
                        <Text>Árboles plantados: {userData.contributedTrees}</Text><Text></Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Target')} style={[styles.button]}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>ENVIAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('QR')} style={[styles.button]}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>RECIBIR - QR</Text>
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
                    </>
                }
            </View>
        </ScrollView>
    );
};

export default Home;