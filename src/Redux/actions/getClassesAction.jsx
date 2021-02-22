import database from '../../config/firebase';

export const getMessagesClasses = (senderID, recieverID) => {
    return (dispatch) => {
        database.database().ref(`messages/${senderID}/${recieverID}`).on('value', (snapShot) => {
            let messages = snapShot.val();
            let classesArray = [];
            console.log('messages', messages);
            for (var key in messages) {
                if (messages[key].reciever === database.auth().currentUser.uid) {
                    classesArray.push('send');
                }
                else {
                    classesArray.push('recieve');
                }
            }
            console.log('classesArray', classesArray);
            dispatch({
                type: 'GET_MESSAGES_CLASSES',
                payload: classesArray
            })
        })
    }
}