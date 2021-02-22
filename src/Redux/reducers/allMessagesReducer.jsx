const initialState = {
    allMessages: [],
    allClasses: []
}

const AllMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MESSAGES': {
            return {
                ...state, allMessages: action.payload
            }
        }
        case 'GET_MESSAGES_CLASSES': {
            return {
                ...state, allClasses: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default AllMessagesReducer;