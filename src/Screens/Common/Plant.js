import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles';
import { plantationEvent } from "../../firebaseCalls";

import { Radio } from 'native-base';

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
            <Radio.Group name="locationRadio" accessibilityLabel="plantation location" value={location} onChange={nextLocation => {
                setLocation(nextLocation);
            }}>
                <Radio value="northamerica" my={1}>
                    Norteamérica
                </Radio>
                <Radio value="southamerica" my={1}>
                    Sudamérica
                </Radio>
                <Radio value="europe" my={1}>
                    Europa
                </Radio>
                <Radio value="asia" my={1}>
                    Asia
                </Radio>
                <Radio value="africa" my={1}>
                    África
                </Radio>
                <Radio value="oceania" my={1}>
                    Oceania
                </Radio>
            </Radio.Group>
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