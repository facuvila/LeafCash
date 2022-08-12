import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from "../../firebaseCalls";

import { useDispatch } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";
import { styles } from '../../styles';

function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = getAuth();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
            getUserData(data.user.uid)
            .then((user) => {
                dispatch({type: types.build, user: user});
                navigation.navigate('Home');
            });
        })
        .catch(error => {
            Alert.alert(error.message);
        })
    }

    return (
      <View style={styles.container}>
        <Image source={require("../../Assets/LeafLogo.png")} style={styles.leafLogo}/>
        <View style={styles.login}>
            <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Correo electrónico</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="leafcash@email.com" placeholderTextColor="#8f8f8f" />
            </View>
            <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: '#000'}}>Contraseña</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="********" placeholderTextColor="#8f8f8f" secureTextEntry={true}/>
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
};

export default Login;