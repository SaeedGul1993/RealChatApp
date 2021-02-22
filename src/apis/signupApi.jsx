import database from '../config/firebase';

export const UserRegister = (name, email, password) => {
    return database.auth().createUserWithEmailAndPassword(email, password);
}