import QRCode from 'react-native-qrcode-svg';
export default function showQRCode(uid) {
    render() {
        return (
          <QRCode
            value={uid}
          />
        );
      };
}