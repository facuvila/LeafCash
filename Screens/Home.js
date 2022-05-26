import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getBalance } from '../apiCalls';
import loggedUser from '../loggedUser';

const axios = require('axios');

function Home({ result }) {
    const navigation = useNavigation();
    //console.log(loggedUser.userName);
    /*let balance = null;
    balance = getBalance();*/

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {false ? <Text>Loading...</Text> : 
                <>
                <Text>LEAF CASH</Text><Text>${loggedUser}</Text>
                <Button
                    title="ENVIAR"
                    onPress={() => navigation.navigate('Target')} />
                <Button
                    title="PAGAR"
                    onPress={() => navigation.navigate('Scan')} />
                <Text>{result}</Text></>
            }
        </View>
    );
};

export default Home;

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL