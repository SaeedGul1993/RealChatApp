import database from '../config/firebase';

export const UserLogin = (email, password) => {
    return database.auth().signInWithEmailAndPassword(email, password);
}