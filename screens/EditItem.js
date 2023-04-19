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
    Image,
    SafeAreaView,
    TouchableOpacity,
    Button,
    getDatabase, ref, set
} from 'react-native';
// import database from '@react-native-firebase/database';




export function EditScreen(props) {




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


        <View style={styles.page}>

            <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Edit item</Text>

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

                <Button title=" Update " style={styles.buttonContainer} />
                <Button title="  Delete  " style={styles.buttonContainer} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginRight: 60,
        marginLeft: 60,
        marginTop: 30,
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
})