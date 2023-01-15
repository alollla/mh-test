import {ADD_POST} from '@/store/actions/actionTypes';

export default function addPostAction (data: any) {
    return {
        type: ADD_POST,
        data
    };
};