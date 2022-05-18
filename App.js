import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scan from './Screens/Scan';
import Home from './Screens/Home';
import Target from './Screens/Transaction/askTarget';
import Amount from './Screens/Transaction/askAmount';
import Confirm from './Screens/Transaction/confirm';

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

const Stack = createNativeStackNavigator();

function App() {
    return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Target" component={AskTargetScreen} />
      <Stack.Screen name="Amount" component={AskAmountScreen} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;