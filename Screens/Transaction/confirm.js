import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import userName from '../../loggedUser';
const axios = require('axios');

function Confirm({ target, amount }) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TRANSFERIR ${amount} A {target}</Text>
            <TouchableOpacity
               onPress = {
                    () => {
                        axios.post(`https://leafcash.herokuapp.com/transaction`, null, 
                            { params: {
                                idOrigen: userName, 
                                idDestino: target,
                                monto: amount
                            }}
                        )
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> Confirmar </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Confirm;