import { firebaseConfig } from '../config/Config';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,

    Image,
    SafeAreaView,
    TouchableOpacity,
    Button,
    getDatabase, set
} from 'react-native';
import { getStorage, ref, uploadBytes, FirebaseStorage, } from "firebase/storage";

// import database from '@react-native-firebase/database';




export function AddItemScreen(props) {


    // getting user status and sending image to that specific user id
    const auth = getAuth();
    const user = auth.currentUser;

    const navigation = useNavigation()
    const [image, setImage] = useState("")



    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")



    const submitData = () => {

        const storage = getStorage();
        //const storageRef = ref(storage, 'image/');
        const storageRef = ref(storage, `images/` + user.uid + `/product-image/${image.name}`);
        console.log(user.uid, image.name);

        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('File Success');
            //displaying upload success msg

            Alert.alert(
                'Image Uploaded to Successfully', 'hi there', [
                { text: 'Yes', onPress: () => console.log('Yes Pressed') }]
            );


        }).catch((error) => {
            console.log(error.message);
        });






    }
    let result
    //select image 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };



    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus])



    const pressHandler = () => {
        navigation.navigate('');
    }

    return (


        <View style={styles.page}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>


            <View style={styles.uploadBtn} >
                <Button title="Upload Image" onPress={() => submitData()} />
            </View>

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

                <Button title=" Cancel " style={styles.buttonContainer} />
                <Button title="  Add  " style={styles.buttonContainer} />

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