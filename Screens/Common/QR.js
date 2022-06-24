import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import { getAuth } from 'firebase/auth';

const logo = 'https://i.ibb.co/drZDr7R/LEAF-LOGO.png';

function QR() {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <View
            style={{
            flexDirection: "row",
            padding: 150
            }}
        >
            <QRCode
            value={user.uid}
            />
        </View>
      );
};

export default QR;

//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL
//COMMIT NO FUNCIONAL