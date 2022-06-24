import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from '../../firebase-config';

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

function Confirm({ target, amount }) {
    const userData = useStore();
    const dispatch = useDispatch();

    const navigation = useNavigation();
    initializeApp(firebaseConfig);

    const functions = getFunctions();
    const createTransaction = httpsCallable(functions, 'createTransaction');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        const newBalance = userData.balance - amount;
                        const newPlantedTrees = userData.plantedTrees + amount / 1000;
                        createTransaction({ uid: target, amount: amount })
                        dispatch({type: types.updateBalance, newBalance: newBalance, newPlantedTrees: newPlantedTrees})
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;