import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import { config } from './config/Config';

const LotsOfStyles = () => {

  return (

    <View style={styles.container}>

      <Text>Click here for signup</Text>
      <Text><button onClick={signup}>Click me</button></Text>
    </View >
  );
};


export default AccountCreate;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
