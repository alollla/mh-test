import {GET_POSTS} from '@/store/actions/actionTypes';

export default function getPostsAction (page: number) {
    return {
        type: GET_POSTS,
        page
    };
};