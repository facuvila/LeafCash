import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateLoggedUserData } from '../loggedUser';

const axios = require('axios');

function Home({ result }) {
    const [userData, setUserData] = useState([]);
    setUserData(updateLoggedUserData(1));

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {false ? <Text>Loading...</Text> : 
                <>
                <Text></Text>
                <Text>LEAF CASH</Text><Text>$</Text>
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