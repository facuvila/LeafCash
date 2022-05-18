import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home({ result }) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LEAF CASH</Text>
        <Button
            title="ENVIAR"
            onPress={() => navigation.navigate('Target')}
        />
        <Button
            title="PAGAR"
            onPress={() => navigation.navigate('Scan')}
        />
        <Text>{result}</Text>
        </View>
    );
};

export default Home;