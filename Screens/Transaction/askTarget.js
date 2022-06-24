import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles';

function Target() {
    const navigation = useNavigation();
    const [target, setTarget] = useState('');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ingresa el destinatario:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => setTarget(value)}
                style={styles.input}
                placeholder="Destinatario"  
            />
            <TouchableOpacity                
                onPress = {
                    () => navigation.navigate({
                        name: 'Amount',
                        params: { target: target },
                        merge: true,
                        })
               } style={[styles.button]}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>SIGUIENTE</Text>
            </TouchableOpacity>
            <Text> o </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={[styles.button]}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>LEER QR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Target;