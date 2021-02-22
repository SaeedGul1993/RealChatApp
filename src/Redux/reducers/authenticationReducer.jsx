const initialState = {
    loggedUserDetail: {}
}

const AuthenticatedSUerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER_DETAIL': {
            return {
                ...state, loggedUserDetail: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default AuthenticatedSUerReducer;