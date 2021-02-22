import { combineReducers } from 'redux';
import AuthenticatedSUerReducer from './authenticationReducer';
import AllUsersReducer from './allUsersReducer';
import SingleUserByIdReducer from './singleUserDetailReducer';
import AllMessagesReducer from './allMessagesReducer';
import MesssageTypingReducer from './messageTypingReducer';

export const RootReducer = combineReducers({
    loginUserDetail: AuthenticatedSUerReducer,
    fetchUsersDetail: AllUsersReducer,
    getUserById: SingleUserByIdReducer,
    specificUserMessages: AllMessagesReducer,
    typingAlert: MesssageTypingReducer
})