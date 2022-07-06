import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from '../../firebase-config';

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

function Confirm({ route }) {
    const target = route.params?.target;
    const amount = route.params?.amount;

    const userData = useStore();
    const dispatch = useDispatch();

    const navigation = useNavigation();
    initializeApp(firebaseConfig);

    const functions = getFunctions();
    const createTransaction = httpsCallable(functions, 'createTransaction');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target.email}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        createTransaction({ uid: target.uid, amount: amount })
                        target.isVendor
                        ? dispatch({type: types.updateBalance, balanceVariation: -amount, contributedTreesVariation: amount/1000})
                        : dispatch({type: types.updateBalance, balanceVariation: -amount})
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;