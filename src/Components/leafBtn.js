import React from 'react';
import { TouchableOpacity, Text } from 'react-native-web';
import { styles } from '../styles';

export default LeafBtn = ({ onPress, children }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
        {children}
    </TouchableOpacity>
);