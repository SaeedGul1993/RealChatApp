import database from '../config/firebase';

export const sendTypingAlert = (typingState, reciever, sender) => {
    return database.database().ref(`messageTyping/${sender}/${reciever}`).set({
        to:sender,
        typing: typingState
    });
}
