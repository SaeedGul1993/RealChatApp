const innitialState = {
    userById: ""
}

const SingleUserByIdReducer = (state = innitialState, action) => {
    switch (action.type) {
        case 'SINGLE_USER': {
            return { ...state, userById: action.payload }
        }
        default: {
            return state;
        }

    }
}

export default SingleUserByIdReducer;