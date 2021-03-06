const initialState = {
    allUsers: []
}

const AllUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_USERS_FETCH': {
            return {
                ...state, allUsers: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default AllUsersReducer;