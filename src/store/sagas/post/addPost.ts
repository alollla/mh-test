import {put, call} from 'redux-saga/effects';

import {addPost} from "@/api/post";
import {
    ADD_POST_SUCCESS,
    ADD_POST_ERROR
} from "@/store/actions/actionTypes";

export default function* addPostSaga(payload: any) {
    try {
        // @ts-ignore
        const response = yield call(addPost, payload.data);
        yield put({ type: ADD_POST_SUCCESS, response });
    } catch(error) {
        yield put({ type: ADD_POST_ERROR, error })
    }
}
