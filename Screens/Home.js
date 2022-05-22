import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home({ result }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        fetch('https://leafcash.herokuapp.com/getUserData?id=michuturquie&campo=balance')
          .then((response) => response.json())
          .then((json) => setData(json))
          .finally(() => setLoading(false))
      }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {isLoading ? <Text>Loading...</Text> : 
                <>
                <Text>LEAF CASH</Text><Text>${data[0].balance}</Text>
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