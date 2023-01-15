import {put, call} from 'redux-saga/effects';

import {getPostDetails} from "@/api/post";
import {GOT_POST_DETAILS_SUCCESS, GOT_POST_DETAILS__ERROR} from "@/store/actions/actionTypes";

export default function* getPostDetailsSaga(payload: any) {
    try {
        // @ts-ignore
        const response = yield call(getPostDetails, payload.id);
        yield put({ type: GOT_POST_DETAILS_SUCCESS, response });
    } catch(error) {
        yield put({ type: GOT_POST_DETAILS__ERROR, error })
    }
}
