import {takeLatest} from 'redux-saga/effects';

import {
    LOGIN_USER,
    GET_POSTS,
    GET_POST_DETAILS,
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    GET_AUTHORS, GET_TAGS
} from "@/store/actions/actionTypes";
import loginSaga from "@/store/sagas/auth";
import {getPosts, getPostDetails, addPost, editPost, removePost} from "@/store/sagas/post";
import {getAuthors} from "@/store/sagas/author";
import {getTags} from "@/store/sagas/tag";

export default function* rootSaga() {
    yield takeLatest(LOGIN_USER, loginSaga)
    yield takeLatest(GET_POSTS, getPosts)
    yield takeLatest(GET_POST_DETAILS, getPostDetails)
    yield takeLatest(ADD_POST, addPost)
    yield takeLatest(EDIT_POST, editPost)
    yield takeLatest(REMOVE_POST, removePost)
    yield takeLatest(GET_AUTHORS, getAuthors)
    yield takeLatest(GET_TAGS, getTags)
}