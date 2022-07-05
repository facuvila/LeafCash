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
            <Text>TRANSFERIR ${amount} A {target}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        const newBalance = userData.balance - amount;
                        const newContributedTrees = userData.contributedTrees + amount / 1000;
                        createTransaction({ uid: target, amount: amount })
                        dispatch({type: types.updateBalance, newBalance: newBalance, newContributedTrees: newContributedTrees})
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;