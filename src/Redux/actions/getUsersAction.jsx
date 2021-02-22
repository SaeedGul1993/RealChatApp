import database from '../../config/firebase';

export const GetAllUsersFromDatabase = (userId) => {
    return (dispatch) => {
        database.database().ref(`users/`).on('value', (snapShot) => {
            let getData = snapShot.val();
            console.log('getData', getData);
            let dummyArray = [];
            for (var key in getData) {
                if (userId !== key) {
                    getData[key].id = key;
                    dummyArray.push(getData[key])
                }
        }
            console.log('duumyAray', dummyArray);
        dispatch({
            type: 'ALL_USERS_FETCH',
            payload: dummyArray
        })
    })
}
}

