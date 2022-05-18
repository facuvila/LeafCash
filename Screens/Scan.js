import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {  BarCodeScanner  } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Scan({}) {
    const [hasPermission, setHasPermission] = useState(null);
    const navigation = useNavigation();

    // Pide permiso de la cámara
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Lo que ocurre al detectar un código QR
    const handleBarCodeScanned = ({ data }) => {
        navigation.navigate({
          name: 'Amount',
          params: { target: data },
          merge: true,
        })
    };

    // Devuelve las pantallas en base a los permisos concedidos
    if (hasPermission === null) {
        return (
            <View>
                <Text>Por favor, permití el acceso a la cámara.</Text>
            </View>);
    }
    if (hasPermission === false) {
        return (
            <View>
                <Text style={{ margin: 10 }}>Sin acceso a la cámara.</Text>
                <Button title={'Permitir acceso a la cámara.'} onPress={() => askForCameraPermission()} />
            </View>);
    }

    // Devuelve la View del Scanner
    return (
        <View>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={{ height: windowHeight, width: windowWidth }} />
        </View>
    );
};

export default Scan;