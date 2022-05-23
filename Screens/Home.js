import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const axios = require('axios');

function Home({ result }) {
    const [isLoading, setLoading] = useState(true);
    const [balance, setBalance] = useState([]);
    const navigation = useNavigation();
    const loggedUser = 'facuvila';    

    axios.get('https://leafcash.herokuapp.com/getUserData', { params: { id: loggedUser, campo:'balance' } })
    .then(function (resp) {
        setBalance(resp.data[0].balance);
        setLoading(false);
    });
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {isLoading ? <Text>Loading...</Text> : 
                <>
                <Text>LEAF CASH</Text><Text>${balance}</Text>
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