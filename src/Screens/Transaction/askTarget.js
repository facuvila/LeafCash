import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { alikeUsernames } from "../../firebaseCalls";
import UsersList from '../../Components/UsersList.js';

import { styles } from '../../styles';
import { normalizeEmail } from '../../helpers';
import { getAuth } from 'firebase/auth';

async function checkForUsers (value) {
    value = value.toLowerCase();
    return await alikeUsernames(value, 3);
}
function Target() {
    const navigation = useNavigation();
    const [foundUsernames, setFoundUsernames] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ingresa el destinatario:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {async (value) => {
                    if(value.length > 2) {
                        setFoundUsernames(await checkForUsers(value));
                        console.log(foundUsernames)
                        const i = foundUsernames.findIndex(e => e.uid === user.uid);
                        console.log(i)
                        if (i > -1) {
                            let aux = foundUsernames;
                            aux.splice(i, 1);
                            setFoundUsernames(aux)
                        }
                    } else {
                        setFoundUsernames([]);
                    }
                }}
                style={styles.input}
                placeholder="Destinatario"  
            />
            <UsersList data={foundUsernames}/>
            <Text> o </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={[styles.button]}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>LEER QR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Target;