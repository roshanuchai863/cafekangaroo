import { firebaseConfig } from '../config/Config';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";




import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
    getDatabase, ref, set
} from 'react-native';
// import database from '@react-native-firebase/database';



// // send to db
// function writeUserData(userId, Add_item, Item_Description, Item_Price) {
//     const db = getDatabase();
//     set(ref(db, 'Add_item/' + userId), {
//         Add_item: itemName,
//         Item_Description: itemDesc,
//         Item_Price: itemPrice
//     })
// }


export function AddItemScreen(props) {

    const navigation = useNavigation()


    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")


    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus])



    const pressHandler = () => {
        navigation.navigate('');
    }

    return (
        <View>
            <View>
                <Text>Add item</Text>
                <TextInput
                    style={styles.input}
                    placeholder="item name"
                    value={itemName}
                    onChangeText={(setItemName) => setEmail(setItemName)}
                >

                </TextInput>

            </View>

            {/* description */}
            <View>
                <Text>Item Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="item Description"
                    value={itemDesc}
                    onChangeText={(setItemDesc) => setEmail(setItemDesc)}
                >
                </TextInput>
            </View>


            {/* price */}
            <View>
                <Text>Items Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="item Price"
                    value={itemPrice}
                    onChangeText={(setItemPrice) => setEmail(setItemPrice)}
                >
                </TextInput>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginHorizontal: 60,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: "#ffffff",
        padding: 5,
        borderWidth: 1,
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
    button: {
        backgroundColor: "#000000",
        padding: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center"
    },
    buttonDisabled: {
        backgroundColor: "#666666",
        padding: 10,
        marginVertical: 10,
    },
    signInLink: {
        marginVertical: 5,
    },
    signInLinkText: {
        textAlign: "center",
    }
})