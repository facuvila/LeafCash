import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useStore } from "../../store/StoreProvider";

function Amount({ route }) {
    const target = route.params?.target;
    const userData = useStore();
    
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFIRIENDO A: {target.email}</Text>
            <TextInput
                keyboardType='numeric'
                editable
                maxLength={10}
                onChangeText = {(value) => setAmount(value)}
            />
            {amount > userData.balance ? <Text>Balance insuficiente!</Text> : null}
            <TouchableOpacity
               onPress = {
                    () => navigation.navigate({
                        name: 'Confirm',
                        params: { target: target, amount: amount },
                        })
                    }>
               <Text> Siguiente </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Amount;