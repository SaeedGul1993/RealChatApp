import database from '../config/firebase';
import moment from 'moment';

export const sendMessageApiForReciever = (message, reciever, sender) => {
    return database.database().ref(`messages/${reciever}/${sender}`).push({
        reciever: reciever,
        message: message,
        createAt: moment().format()
    });
}

export const sendMessageApiForSender = (message, reciever, sender) => {
    return database.database().ref(`messages/${sender}/${reciever}`).push({
        reciever: reciever,
        message: message,
        createAt: moment().format()
    });
}
