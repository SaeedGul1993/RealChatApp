import database from '../config/firebase';

export const UserLogout = () => {
    return database.auth().signOut();
}

export const UpdateOnlineKey = (userId) => {
    return database.database().ref(`users/${userId}`).update({ online: false });
}