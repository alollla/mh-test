import {GET_POST_DETAILS} from '@/store/actions/actionTypes';

export default function getPostDetailsAction (id: number) {
    return {
        type: GET_POST_DETAILS,
        id
    };
};