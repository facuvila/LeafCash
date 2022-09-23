import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles';
import { plantationEvent } from "../../firebaseCalls";

import { Box, CheckIcon, Radio, Select } from 'native-base';

function Plant() {
    const [location, setLocation] = useState("");
    const [plantedTrees, setPlantedTrees] = useState(0);
    const navigation = useNavigation();

    return (
        <View
            style={{
            flexDirection: "column",
            padding: 80
            }}
        >
            <Text>Plantar árboles</Text>
            <Text>Ubicación:</Text>
            <Box w="3/4" maxW="300">
                <Select selectedValue={location} minWidth="200" accessibilityLabel="Seleccionar región" placeholder="Seleccionar región" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={location => setLocation(location)}>
                    <Select.Item label="Norteamérica" value="northamerica" />
                    <Select.Item label="Sudamérica" value="southamerica" />
                    <Select.Item label="Europa" value="europe" />
                    <Select.Item label="Asia" value="asia" />
                    <Select.Item label="Africa" value="africa" />
                    <Select.Item label="Oceania" value="oceania" />
                </Select>
            </Box>
            <Text>Árboles plantados:</Text>
            <TextInput
                editable
                maxLength={40}
                onChangeText = {(value) => {

                    setPlantedTrees(value)
                }}
                placeholder="Ubicación"
                style={styles.input}
                keyboardType="numeric"
            />
            <TouchableOpacity
                disabled={!location || !plantedTrees}
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