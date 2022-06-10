import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert, Image } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Scan from './Screens/Scan';
import Home from './Screens/Home';
import Target from './Screens/Transaction/askTarget';
import Amount from './Screens/Transaction/askAmount';
import Confirm from './Screens/Transaction/confirm';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logo = 'https://i.ibb.co/drZDr7R/LEAF-LOGO.png';

function HomeScreen({ route }) {
    React.useEffect(() => {}, [route.params?.post]);
        return (
        <Home result={route.params?.post}/>
    );
}

function ScanScreen({}) {
    return (
        <Scan/>
    );
}

function AskTargetScreen({}) {
    return (
        <Target/>
    );
}
  
function AskAmountScreen({ route }) {
    React.useEffect(() => {}, [route.params?.target]);
    return (
        <Amount target={route.params?.target}/>
    );
}
  
function ConfirmScreen({ route }) {
    React.useEffect(() => {}, [route.params?.target], [route.params?.amount]);
    return (
        <Confirm target={route.params?.target} amount={route.params?.amount}/>
    );
}

function LoginScreen() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert(error.message);
      })
    }

    return (
      <View style={styles.container}>
        <Image source={{ uri: logo }} style={styles.leafLogo}/>
        <View style={styles.login}>
            <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Correo electrónico</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="leafcash@email.com" />
            </View>
            <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Contraseña</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="********" secureTextEntry={true}/>
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button]}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>INGRESAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>¿No tenes cuenta? Registrate</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

function SignupScreen() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatedPassword, setRepeatedPassword] = React.useState('')
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error.message);
            Alert.alert(error.message)
        })
    }

    return (
      <View style={styles.container}>
        <Image source={{ uri: logo }} style={styles.leafLogo}/>
        <View style={styles.login}>
            <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Correo electrónico</Text>
            <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="leafcash@email.com" />
            </View>
            <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Contraseña</Text>
            <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="********" secureTextEntry={true}/>
            </View>
            <View>
            <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Repetir contraseña</Text>
            <TextInput onChangeText={(text) => setRepeatedPassword(text)} style={styles.input} placeholder="********" secureTextEntry={true}/>
            </View>
            <TouchableOpacity onPress={() => password == repeatedPassword ? handleCreateAccount() : Alert.alert('Las contraseñas no coinciden')} style={[styles.button]}>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>CREAR CUENTA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>¿Ya tenés cuenta? Ingresá</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const Stack = createNativeStackNavigator();
  
export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="Target" component={AskTargetScreen} />
            <Stack.Screen name="Amount" component={AskAmountScreen} />
            <Stack.Screen name="Confirm" component={ConfirmScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#046E19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: windowWidth,
    height: 630,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#fff',
    opacity: 10,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  leafLogo: {
    width: 300,
    height: 100,
    marginBottom: 40,
    marginTop: 100,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#046E19'
  }
});