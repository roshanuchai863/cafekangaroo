import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, auth, db } from '../config/Config';
import { getDatabase, set } from "firebase/database";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert
} from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';


// import database from '@react-native-firebase/database';




export function AddItemScreen(props) {
  initializeApp(firebaseConfig);



  // getting user status and sending image to that specific user id
  const auth = getAuth();
  const user = auth.currentUser;

  const storage = getStorage();


  const navigation = useNavigation()
  const [itemName, setItemName] = useState("")
  const [itemDesc, setItemDesc] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const [image, setImage] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const uploadImage = async () => {

    //const storageRef = ref(storage, 'image/');
    const storageRef = ref(storage, `images/` + user.uid + `/product-image/${image.name}`);
    console.log(user.uid + image.name + image.uri);

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('File Success');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  useEffect(() => {
    if (!props.authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [props.authStatus])



  const cancelHandler = () => {
    navigation.navigate("Home");
  }


  //read and write to fbdatabase
  const userinputs = async () => {

    // condition for empty input field
    if ((itemDesc && itemName && itemPrice).length < 1) {
      alert("Input field is empty")
    }
    else {
      const docRef = await addDoc(collection(db, "user"), {
        // ImageUrlLocation: storage,
        productTitle: itemName,
        productDesc: itemDesc,
        productPrice: itemPrice,
      });
      console.log("document write id  :", docRef.id + image.uri);
    }

    //resetting input fields
    setItemDesc("");
    setItemName("");
    setItemPrice("");

    Alert.alert("Added ", "Successfully Added",)


  }







  return (


    <View style={styles.page}>



      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      </View>


      <View>

        <Button title='upload Image' onPress={uploadImage} />

      </View>


      {/* <View style={styles.uploadBtn} >
                <Button title="Upload Image" onPress={() => uploadImage()} />
            </View> */}

      <View sytle={styles.itemposition}>
        <Text sytle={styles.titleName}>Add item</Text>

        <TextInput
          style={styles.input}
          placeholder="item name"
          value={itemName}
          onChangeText={(setItemNames) => setItemName(setItemNames)}
        >
        </TextInput>
      </View>





      {/* description */}
      <View sytle={styles.itemposition}>
        <Text sytle={styles.titleName}>Item Description</Text>
        <TextInput
          style={styles.descriptionbox}
          placeholder="item Description"
          value={itemDesc}
          onChangeText={(setItemDescs) => setItemDesc(setItemDescs)}
        >
        </TextInput>
      </View>


      {/* price */}
      <View sytle={styles.itemposition}>
        <Text sytle={styles.titleName}>Items Price</Text>
        <TextInput
          style={styles.input}
          placeholder="item Price"
          value={itemPrice}
          onChangeText={(setItemPrices) => setItemPrice(setItemPrices)}
        >
        </TextInput>

      </View>
      <View style={styles.container}>

        <Button title=" Cancel " style={styles.buttonContainer} onPress={cancelHandler} />
        <Button title=" add " style={styles.buttonContainer} onPress={userinputs}
        />


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginRight: 60,
    marginLeft: 60,
    marginTop: 30,
    alignContent: "center",
  },

  input: {
    backgroundColor: "#ffffff",
    padding: 5,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#cccccc",
  },
  validInput: {
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 5,
  },
  inputGroup: {
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,

  },
  buttonContainer: {
    padding: 80,


  },



  itemposition:
  {
    alignContent: 'center',
    backgroundColor: "#000000",
    paddingTop: 20,
  },
  descriptionbox: {
    height: 100,
    backgroundColor: "#ffffff",
    padding: 5,
    paddingTop: 2,
    borderWidth: 1,
    borderColor: "#cccccc",
    marginTop: 10,

  },


  uploadBtn: {
    height: 50,
    marginTop: 20,
    color: "#cccccc",
  },
})
