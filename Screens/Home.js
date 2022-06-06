import React, {useState, useEffect} from 'react';
import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '../firebase-config';

function Home({ result }) {
    const navigation = useNavigation();
    initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;
    const [balance, setBalance] = useState();
    const [plantedTrees, setPlantedTrees] = useState();

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);

        (async () => { //Para evitar llamado a la base de datos, crear objeto local userData que se actualice a la vez que la base de datos
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setBalance(docSnap.data().balance);
            setPlantedTrees(docSnap.data().plantedTrees);
        })();

        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
    };

    useEffect(() => {
        if (user) {
            (async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setBalance(docSnap.data().balance);
                setPlantedTrees(docSnap.data().plantedTrees);
            })();
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {balance == null ? <Text>CARGANDO LEAF...</Text> : 
                <>
                <ScrollView
                    refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <Text>LEAF CASH</Text>
                    <Text>${balance}</Text>
                    <Text>Árboles plantados: {plantedTrees}</Text><Text></Text>
                    <Button
                        title="ENVIAR"
                        onPress={() => navigation.navigate('Target')} />
                    <Button
                        title="PAGAR"
                        onPress={() => navigation.navigate('Scan')} />
                    <Text>{result}</Text>
                </ScrollView>
                </>
            }
        </View>
    );
};

export default Home;

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL