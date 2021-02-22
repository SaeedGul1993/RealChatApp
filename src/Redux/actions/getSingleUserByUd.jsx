import database from '../../config/firebase';

export const getUserById = (data) => {
    return (dispatch) => {
        database.database().ref(`users/${data}`).on('value', (snapShot) => {
            let userDetail = snapShot.val();
            console.log('userDetail', userDetail);
            dispatch({
                type: 'SINGLE_USER',
                payload: userDetail
            })
        })
    }
}