import firebase from 'firebase/campat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBFd4wiXpAvYTUdQVrEv86_4nZwCTTcIFE",
    authDomain: "crossplatform-66185.firebaseapp.com",
    projectId: "crossplatform-66185",
    storageBucket: "crossplatform-66185.appspot.com",
    messagingSenderId: "977367022977",
    appId: "1:977367022977:web:c79eed49c92f3b7633fc80",
    measurementId: "G-765CPEV9NL"
};

firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase