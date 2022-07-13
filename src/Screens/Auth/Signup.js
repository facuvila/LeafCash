import React, {useState} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from "../../store/StoreProvider";
import { initialStore, types } from '../../store/StoreReducer';

import { styles } from '../../styles.js';

function Signup() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const navigation = useNavigation();

    const auth = getAuth();

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
            const basicUser = {
                ...initialStore,
                email: data.user.email
            }
            dispatch({type: types.build, user: basicUser})
            navigation.navigate('Home');
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    return (
      <View style={styles.container}>
        <Image source={require("../../Assets/LeafLogo.png")}  style={styles.leafLogo}/>
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
};

export default Signup;