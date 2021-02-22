import database from '../../config/firebase';

export const getMessagesByIds = (senderID, recieverID) => {
    return (dispatch) => {
        database.database().ref(`messages/${senderID}/${recieverID}`).on('value', (snapShot) => {
            let messages = snapShot.val();
            let messageArray = [];
            console.log('messages', messages);
            for (var key in messages) {
                messages[key].id = key;
                messageArray.push(messages[key])
            }
            console.log('messageArray',messageArray);
            dispatch({
                type: 'GET_MESSAGES',
                payload: messageArray
            })
        })
    }
}