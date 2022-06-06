import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, runTransaction } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '../../firebase-config';

function Confirm({ target, amount }) {
    const navigation = useNavigation();
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        try {
                            (async () => {
                                await runTransaction(db, async (transaction) => { // PASAR A BACKEND, FUNCIÓN QUE RECIBA TARGET Y AMOUNT POR PARTE DEL USUARIO LOGUEADO Y EJECUTE LA TRANSACCIÓN.
                                    const originRef = doc(db, "users", user.uid); //Referencia al usuario logueado
                                    //const targetRef = doc(db, "users", toEmailuser.uid); //Referencia al usuario destino
                                    const userDoc = await transaction.get(originRef);
                                    const newBalance = userDoc.data().balance - amount;
                                    transaction.update(originRef, { balance: newBalance });
                                });
                            })();
                            console.log("Transaction successfully committed!");
                          } catch (error) {
                            console.log("Transaction failed: ", error);
                          }
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;