import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from 'react'
import * as SignOutButton from "../components/SignOutButton";
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext"
import { ItemContext } from "../contexts/ItemContext"
import { addDoc, collection } from "firebase/firestore"
import { ListItem } from "../components/ListItem"
import IonIcons from '@expo/vector-icons/Ionicons'


export function HomeScreen(props) {
    const navigation = useNavigation()
    const authStatus = useContext(AuthContext)
    const item = useContext(NoteContext)
    const DB = useContext(DBContext)


    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [image, setImage] = useState("");

    const saveItem = async () => {
        setShowModal(false)
        const itemObj = { title: title, content: item }
        // add note to firebase
        const path = `users/{authStatus.uid}/item`
      //  const ref = await addDoc(collection(DB, path), itemObj)
        setTitle(``)
        setNote(``)
    }

    // //read data from database
    // useEffect(() => {
    //     const readData = async () => {
    //         const docRef = doc(db, "coffee", "xWrwUXqb9IU25TIRRQ27");
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             setImage(docSnap.data().ImageUrl);
    //             console.log("iamge location:" + (docSnap.data().imageUrl))
    //             setItemName(docSnap.data().productTitle);
    //             setItemDesc(docSnap.data().productDesc);
    //             setItemPrice(docSnap.data().productPrice);


    //             console.log(docSnap.data())

    //         }
    //     }
    //     readData();
    // }, [])

    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus])

    const ListClickHandler = (data) => {
        navigation.navigate("Detail", data)
    }

    const ListItem = (props) => {
        return (
            <View
                style={styles.listItem}

            >
                <TouchableOpacity onPress={
                    () => ListClickHandler({ id: props.id, itemName: props.itemName, itemPrice: props.itemPrice, itemDes: props.itemDesc })
                }
                >
                    <Text>
                        {props.itemName}
                    </Text>
                </TouchableOpacity>
                <Image>{props.itemImage}</Image>
                <Text>{props.itemPrice}</Text>
            </View>
        )
    }

    const ListItemSeparator = (props) => {
        return (
            <View style={styles.separator} ></View>
        )
    }



    const Additemscreen = () => {
        navigation.navigate('AddItem');
        // navigation.push('AddItem');
    }

    const editItemScreen = () => {
        navigation.navigate('EditItem');
        // navigation.push('EditItem');
    }

    return (



        <View style={styles.screen} >
            <Text style={styles.mainfont}>Welcome to Kangaroo Cafe</Text>

            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

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




            
           
            {/* <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Item Description</Text>
                <TextInput
                    style={styles.descriptionbox}
                    placeholder="item Description"
                    value={itemDesc}
                    onChangeText={(setItemDescs) => setItemDesc(setItemDescs)}
                >
                </TextInput>
            </View> */}


            {/* price */}
            {/* <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Items Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="item Price"
                    value={itemPrice}
                    onChangeText={(setItemPrices) => setItemPrice(setItemPrices)}
                >
                </TextInput>

            </View> */}
            
            {/* <View style={styles.container}>

                <Button title=" Delete " style={styles.buttonContainer} onPress={deleteData} />
                < Button title=" add " style={styles.buttonContainer} onPress={udpdatename}
                />


            </View> */}
            <SignOutButton.SignOutButton text="Sign out" />
            < TouchableOpacity
                onPress={() => Additemscreen()}
            >
                <Text>Add Item</Text>


            </TouchableOpacity>


            < TouchableOpacity
                onPress={() => editItemScreen()}
            >
                <Text>Edit Item</Text>


            </TouchableOpacity>


        </View >



    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
    },
    modal: {
        padding: 10,
        paddingTop: 50,
        flex: 1,
        justifyContent: "start",
        margin: 20,
        backgroundColor: "lightblue",
    },
    mainfont: {
        fontSize: 50,
        color: "#ff0000",
        textAlign: "center",
    },
    modalInput: {
        fontSize: 18,
        color: "#ff0000",
        textAlign: "left",
        paddingLeft: 150,
    },
    modalInput2: {
        minHeight: 80,
        fontSize: 18,
        backgroundColor: "#ffffff",
    },
    modalLabel: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#000000",
        padding: 5,
        flex: 1,
    },
    addButton: {
        padding: 5,
        backgroundColor: "green",
        flex: 1,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 12,
        textAlign: "center",
    },
    buttonsRow: {
        flexDirection: "row",
        marginVertical: 10,
    },
    listItem: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    separator: {
        backgroundColor: '#CCCCCC',
        height: 2,
    }
})
