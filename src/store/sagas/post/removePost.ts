import {put, call} from 'redux-saga/effects';

import {removePost} from "@/api/post";
import {
    REMOVE_POST_SUCCESS, REMOVE_POST_ERROR, GET_POSTS
} from "@/store/actions/actionTypes";

export default function* removePostSaga(payload: any) {
    try {
        // @ts-ignore
        const response = yield call(removePost, payload.id);
        yield put({ type: REMOVE_POST_SUCCESS, response });
        yield put({ type: GET_POSTS });
    } catch(error) {
        yield put({ type: REMOVE_POST_ERROR, error })
    }
}
