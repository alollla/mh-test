import {put, call} from 'redux-saga/effects';

import login from "@/api/auth/login";
import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS} from "@/store/actions/actionTypes";

export default function* loginSaga(payload:any) {
    try {
        // @ts-ignore
        const response = yield call(login, payload.form);
        yield put({ type: LOGIN_USER_SUCCESS, response });
    } catch(error) {
        yield put({ type: LOGIN_USER_ERROR, error })
    }
}
