import { firebaseConfig } from '../config/Config';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import React from 'react';


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


export function AddItem({ navigation }) {

    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    useEffect(() => {
        if (authStatus) {
            // navigate adds a back arrow to the header
            // navigation.navigate("Home")
            // reset will make "Home" the root page of the navigation
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
    }, [authStatus])

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