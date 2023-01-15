import {REMOVE_POST} from '@/store/actions/actionTypes';

export default function getPostsAction (id: number) {
    return {
        type: REMOVE_POST,
        id
    };
};