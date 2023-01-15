import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import auth from '@/store/reducers/auth';
import post from '@/store/reducers/post';
import author from '@/store/reducers/author';
import tag from '@/store/reducers/tag';

const createRootReducer = (history:History) => combineReducers({
    router: connectRouter(history),
    auth,
    post,
    author,
    tag,
})
export default createRootReducer;