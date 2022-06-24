import React, { useEffect, useReducer } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Scan from './Screens/Common/Scan';
import Home from './Screens/Common/Home';
import Target from './Screens/Transaction/askTarget';
import Amount from './Screens/Transaction/askAmount';
import Confirm from './Screens/Transaction/confirm';
import Login from './Screens/Auth/Login';
import Signup from './Screens/Auth/Signup';
import QR from './Screens/Common/QR';

import StoreProvider from './store/StoreProvider';

function HomeScreen({ route }) {
    useEffect(() => {}, [route.params?.post]);
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
    useEffect(() => {}, [route.params?.target]);
    return (
        <Amount target={route.params?.target}/>
    );
}
  
function ConfirmScreen({ route }) {
    useEffect(() => {}, [route.params?.target], [route.params?.amount]);
    return (
        <Confirm target={route.params?.target} amount={route.params?.amount}/>
    );
}

function QRScreen({}) {
    return (
        <QR/>
    );
}

function LoginScreen() {
    return (
      <Login/>
    );
}

function SignupScreen() {
    return (
      <Signup/>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <StoreProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Scan" component={ScanScreen} />
                    <Stack.Screen name="Target" component={AskTargetScreen} />
                    <Stack.Screen name="Amount" component={AskAmountScreen} />
                    <Stack.Screen name="Confirm" component={ConfirmScreen} />
                    <Stack.Screen name="QR" component={QRScreen} />
                </Stack.Navigator>
            </NavigationContainer> 
        </StoreProvider>
    );
}