import {takeLatest} from 'redux-saga/effects';

import {LOGIN_USER, GET_POSTS} from "@/store/actions/actionTypes";
import loginSaga from "@/store/sagas/auth";
import {getPostsSaga} from "@/store/sagas/post";

export default function* rootSaga() {
    yield takeLatest(LOGIN_USER, loginSaga)
    yield takeLatest(GET_POSTS, getPostsSaga)
}