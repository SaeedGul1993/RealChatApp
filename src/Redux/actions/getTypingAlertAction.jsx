import database from '../../config/firebase';

export const getTypingAlertAction = (senderID, recieverID) => {
    return (dispatch) => {
        database.database().ref(`messageTyping/${senderID}/${recieverID}`).on('value', (snapShot) => {
            if (snapShot.val().typing !== null) {
                let messagesTyping = snapShot.val().typing;
                let typingUserId = snapShot.val().to;
                console.log('messagesTyping', messagesTyping);
                dispatch({
                    type: 'GET_MESSAGES_TYPING_ALERT',
                    payload: messagesTyping
                })
                dispatch({
                    type: 'GET_MESSAGES_TYPING_ALERT_USER_ID',
                    payload: typingUserId
                })
            }
        })
    }
}