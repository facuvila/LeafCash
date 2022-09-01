import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useStore } from "../../store/StoreProvider";
import MoneyInput from 'react-native-money-input'

function Amount({ route }) {
    const target = route.params?.target;
    const userData = useStore();
    
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFIRIENDO A: {target.email}</Text>
            <MoneyInput onChangeText={(value) => setAmount(value)} autoFocus={true} style={styles.moneyInput} />
            {amount > userData.balance ? <Text>Balance insuficiente!</Text> : null}
            <TouchableOpacity
               onPress = {
                    () => navigation.navigate({
                        name: 'Confirm',
                        params: { target: target, amount: amount },
                        })
                    }
                disabled={amount > userData.balance}>
               <Text> Siguiente </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Amount;

const styles = StyleSheet.create({
    moneyInput: {
        fontSize: 74,
        fontWeight: 'bold',
        color: 'black',
        borderWidth: 0
    }
})