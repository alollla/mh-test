import {put, call} from 'redux-saga/effects';

import {editPost} from "@/api/post";
import {
    EDIT_POST_SUCCESS, EDIT_POST_ERROR
} from "@/store/actions/actionTypes";

export default function* editPostSaga(payload: any) {
    try {
        // @ts-ignore
        const response = yield call(editPost, payload.data);
        yield put({ type: EDIT_POST_SUCCESS, response });
    } catch(error) {
        yield put({ type: EDIT_POST_ERROR, error })
    }
}
