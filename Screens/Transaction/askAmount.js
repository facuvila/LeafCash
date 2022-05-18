import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Amount({ target }) {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIENDO A: {target}</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => setAmount(value)}
            />
            <TouchableOpacity
               onPress = {
                    () => navigation.navigate({
                        name: 'Confirm',
                        params: { target: target, amount: amount },
                        merge: true,
                        })
               }>
               <Text> Siguiente </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Amount;