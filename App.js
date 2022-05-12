import React, {useState, useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  BarCodeScanner  } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {}, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LEAF CASH</Text>
      <Button
        title="ESCANEAR"
        onPress={() => navigation.navigate('Scan')}
      />
      <Text> {route.params?.post} </Text>
    </View>
  );
}

function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);

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
          name: 'Home',
          params: { post: data },
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
}

const Stack = createNativeStackNavigator();

function App() {
  // Return the View
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;