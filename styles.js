import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#046E19',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login: {
      width: windowWidth,
      height: 630,
      borderColor: '#fff',
      borderWidth: 2,
      backgroundColor: '#fff',
      opacity: 10,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
    },
    leafLogo: {
      width: 300,
      height: 100,
      marginBottom: 40,
      marginTop: 100,
    },
    input: {
      width: 250,
      height: 40,
      borderColor: '#000',
      borderBottomWidth: 1,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#fff',
      marginBottom: 20
    },
    button: {
      width: 250,
      height: 40,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor: '#046E19'
    }
  });