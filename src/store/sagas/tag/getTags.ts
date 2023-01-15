import {put, call} from 'redux-saga/effects';

import {getTags} from "@/api/tag";
import {GOT_TAGS_SUCCESS, GOT_TAGS_ERROR} from "@/store/actions/actionTypes";

export default function* getTagsSaga() {
    try {
        // @ts-ignore
        const response = yield call(getTags);
        yield put({ type: GOT_TAGS_SUCCESS, response });
    } catch(error) {
        yield put({ type: GOT_TAGS_ERROR, error })
    }
}
