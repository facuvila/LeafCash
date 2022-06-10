import React, {useState, useEffect} from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from '../firebase-config';

function Home({ result }) {
    const navigation = useNavigation();

    initializeApp(firebaseConfig);
    const auth = getAuth();
    const user = auth.currentUser;
    const functions = getFunctions();
    let userData = null;

    const getUserData = httpsCallable(functions, 'getUserData');
    useEffect(() => {
        if (user) {
            getUserData({ uid: user.uid })
            .then((result) => {
                console.log(result);
            });
            
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {userData == null ? <Text>CARGANDO LEAF...</Text> : 
                <>
                <ScrollView>
                    <Text>LEAF CASH</Text>
                    <Text>${userData.balance}</Text>
                    <Text>Árboles plantados: {userData.plantedTrees}</Text><Text></Text>
                    <Button
                        title="ENVIAR"
                        onPress={() => navigation.navigate('Target')} />
                    <Button
                        title="PAGAR"
                        onPress={() => navigation.navigate('Scan')} />
                    <Text>{result}</Text>
                </ScrollView>
                </>
            }
        </View>
    );
};

export default Home;

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL