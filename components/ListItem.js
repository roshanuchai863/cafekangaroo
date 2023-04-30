import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'react-native';
export function ListItem(props) {
    const [image, setimage] = useState()
    const data = {
        id: props.id,
        itemName: props.itemName,
        itemPrice: props.itemPrice,
        itemDesc: props.itemDesc,
        image: props.ImageUrl

    }


    return (
        <Pressable onPress={() => props.handler(data())}>
            <View style={styles.item}>

                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Text style={styles.itemText}>{props.itemName}</Text>
                <Text style={styles.itemText}>{props.itemDesc}</Text>
                <Text style={styles.itemText}>{props.itemPrice}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 18,
    }
})
