import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { alikeUsernames } from "../../firebaseCalls";

import { styles } from '../../styles';

async function checkForUsers (value) {
    value = value.toLowerCase();
    return await alikeUsernames(value, 3);
}
function Target() {
    const navigation = useNavigation();
    const [foundUsernames, setFoundUsernames] = useState([]);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ingresa el destinatario:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {async (value) => {
                    if(value.length > 3) {
                        setFoundUsernames(await checkForUsers(value));
                    } else {
                        setFoundUsernames([]);
                    }
                }}
                style={styles.input}
                placeholder="Destinatario"  
            />
            {foundUsernames.map((user) => {
                return (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate({
                            name: 'Amount',
                            params: { target: user },
                        })
                    }} style={[styles.button]} key={user.email}>
                        <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>{user.email}{user.isVendor && "VENDEDOR"}</Text>
                    </TouchableOpacity>
                )
            })}
            <Text> o </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={[styles.button]}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>LEER QR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Target;