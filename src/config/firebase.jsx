import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAh-26vv6RbKRa3p34ePpd-mNMsrgF_eQc",
    authDomain: "chatapp-azaan.firebaseapp.com",
    projectId: "chatapp-azaan",
    storageBucket: "chatapp-azaan.appspot.com",
    messagingSenderId: "614072892197",
    appId: "1:614072892197:web:619c1e20f9dcafcaa038cc",
    measurementId: "G-HZ7VZ3LH5G"
};

let database = firebase.initializeApp(firebaseConfig);

export default database;
