import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles';
import { plantationEvent } from "../../firebaseCalls";

function Plant() {
    const [location, setLocation] = useState("");
    const [plantedTrees, setPlantedTrees] = useState(0);
    const navigation = useNavigation();

    return (
        <View
            style={{
            flexDirection: "column",
            padding: 150
            }}
        >
            <Text>Plantar árboles</Text>
            <Text>Ubicación:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => {setLocation(value)}}
                placeholder="Ubicación"
                style={styles.input}
            />
            <Text>Árboles plantados:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => {setPlantedTrees(value)}}
                placeholder="Ubicación"
                style={styles.input}
                keyboardType="numeric"
            />
            <TouchableOpacity
               onPress = {
                    () => {
                        plantationEvent(location, plantedTrees)
                        navigation.navigate({ name: 'Home' })
                    }
               }>
               <Text> PLANTAR </Text>
            </TouchableOpacity>
        </View>
      );
};

export default Plant;