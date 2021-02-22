const initialState = {
    typing: '',
    typerId: ''
}

const MesssageTypingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MESSAGES_TYPING_ALERT': {
            return {
                ...state, typing: action.payload
            }
        }
        case 'GET_MESSAGES_TYPING_ALERT_USER_ID': {
            return {
                ...state, typerId: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default MesssageTypingReducer;