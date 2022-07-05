import React from 'react';

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

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <StoreProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Scan" component={Scan} />
                    <Stack.Screen name="Target" component={Target} />
                    <Stack.Screen name="Amount" component={Amount} />
                    <Stack.Screen name="Confirm" component={Confirm} />
                    <Stack.Screen name="QR" component={QR} />
                </Stack.Navigator>
            </NavigationContainer> 
        </StoreProvider>
    );
}