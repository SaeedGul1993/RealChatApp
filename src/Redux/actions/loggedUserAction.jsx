const logged_User_Action = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'AUTH_USER_DETAIL',
            payload: data
        })
    }
}

export { logged_User_Action };