import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Confirm({ target, amount }) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target}</Text>
            <TouchableOpacity
               onPress = {
                    () => navigation.navigate({ name: 'Home' })
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;