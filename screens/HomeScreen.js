import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from 'react'
import { SignOutButton } from '../components/SignOutButton';
import { AddItem } from "./AddItem";
import React from 'react'


export function HomeScreen(props) {
    props.navigation



    const navigation = useNavigation()

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    const saveNote = () => {
        setShowModal(false)
        const noteObj = { title: title, content: note }
        props.add(noteObj)
    }

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
                    () => ListClickHandler({ id: props.id, title: props.title, content: props.content })
                }
                >
                    <Text>
                        {props.title}
                    </Text>
                </TouchableOpacity>
                <Text>{props.content}</Text>
            </View>
        )
    }

    const ListItemSeparator = (props) => {
        return (
            <View style={styles.separator} ></View>
        )
    }



    const pressHandler = () => {
        navigation.navigate('AddItem');
        // navigation.push('AddItem');
    }

    return (



        <View style={styles.screen}>
            <Text>HI there</Text>
            <TouchableOpacity
                style={styles.signInLink}
                title="signuy"
                onPress={() => navigation.navigate("Signup")}
            >
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
    modalInput: {
        fontSize: 18,
        backgroundColor: "#ffffff",
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
