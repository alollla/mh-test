import {put, call} from 'redux-saga/effects';

import {getPosts} from "@/api/post";
import {GOT_POSTS_SUCCESS, GOT_POSTS_ERROR} from "@/store/actions/actionTypes";

export default function* getPostsSaga(payload: any) {
    try {
        // @ts-ignore
        const response = yield call(getPosts, payload.page);
        yield put({ type: GOT_POSTS_SUCCESS, response });
    } catch(error) {
        yield put({ type: GOT_POSTS_ERROR, error })
    }
}
