import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { getAuth } from 'firebase/auth';

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