import {EDIT_POST} from '@/store/actions/actionTypes';

export default function addPostsAction (data: any) {
    return {
        type: EDIT_POST,
        data
    };
};