import firestore from '@react-native-firebase/firestore';

export async function getDataFiles(retriveData) {
    const auth = getAuth();
    const user = auth.currentUser;

    var itemlist = []
    var snapshot = await firebase.firestore()
        .collection(`users/${user.uid}/coffee`)
        .get()
    snapshot.forEach((doc) => {
        const readlist = doc.data()
        itemlist.push(readlist)
    })
    retriveData(itemlist)
}