import database from '../config/firebase';

export const UpdateProfileImage = (userId, profileUrl) => {
    console.log('file url', profileUrl);
    return database.database().ref(`users/${userId}`).update({
        url: profileUrl
    });
}