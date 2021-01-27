import { combineReducers } from 'redux';
import { postReducer } from './postReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer
})