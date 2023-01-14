import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import auth from '@/store/reducers/auth';
import post from '@/store/reducers/post';

const createRootReducer = (history:History) => combineReducers({
    router: connectRouter(history),
    auth,
    post,
})
export default createRootReducer;