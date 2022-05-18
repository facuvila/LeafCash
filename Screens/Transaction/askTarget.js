import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Target({}) {
    const navigation = useNavigation();
    const [target, setTarget] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ingresa el destinatario:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => setTarget(value)}
            />
            <TouchableOpacity
               onPress = {
                    () => navigation.navigate({
                        name: 'Amount',
                        params: { target: target },
                        merge: true,
                        })
               }>
               <Text> Siguiente </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Target;