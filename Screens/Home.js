import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from '../firebase-config';

function Home({ result }) {
    const [balance, setBalance] = useState();
    const [plantedTrees, setPlantedTrees] = useState();
    const navigation = useNavigation();
    initializeApp(firebaseConfig);
    const db = getFirestore();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            (async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setBalance(docSnap.data().account.balance);
                setPlantedTrees(docSnap.data().account.plantedTrees);
            })();
        }
    });
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {balance == null ? <Text>CARGANDO LEAF...</Text> : 
                <>
                <Text>LEAF CASH</Text>
                <Text>${balance}</Text>
                <Text>Árboles plantados: {plantedTrees}</Text><Text></Text>
                <Button
                    title="ENVIAR"
                    onPress={() => navigation.navigate('Target')} />
                <Button
                    title="PAGAR"
                    onPress={() => navigation.navigate('Scan')} />
                <Text>{result}</Text></>
            }
        </View>
    );
};

export default Home;

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL