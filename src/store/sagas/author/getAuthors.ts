import {put, call} from 'redux-saga/effects';

import {getAuthors} from "@/api/author";
import {GOT_AUTHORS_SUCCESS, GOT_AUTHORS_ERROR} from "@/store/actions/actionTypes";

export default function* getAuthorsSaga() {
    try {
        // @ts-ignore
        const response = yield call(getAuthors);
        yield put({ type: GOT_AUTHORS_SUCCESS, response });
    } catch(error) {
        yield put({ type: GOT_AUTHORS_ERROR, error })
    }
}
