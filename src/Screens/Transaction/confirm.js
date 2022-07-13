import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createTransaction } from "../../firebaseCalls";

import { useDispatch, useStore } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";

function Confirm({ route }) {
    const target = route.params?.target;
    const amount = route.params?.amount;

    const userData = useStore();
    const dispatch = useDispatch();

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target.email}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        createTransaction(target.uid, amount)
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