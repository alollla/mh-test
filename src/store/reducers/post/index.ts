import {GOT_POSTS_ERROR, GOT_POSTS_SUCCESS} from "@/store/actions/actionTypes";
import ErrorService from "@/services/error.service";

export default function postReducer(state = {}, action: any) {
    const response = action.response;
    const headers = response?.headers;

    switch(action.type) {
        case GOT_POSTS_SUCCESS:
            return {
                ...state,
                posts: response.data,
                pageSize: +headers['x-pagination-per-page'],
                total: +headers['x-pagination-total-count'],
                current: +headers['x-pagination-current-page'],
                response
            };
        case GOT_POSTS_ERROR:
            ErrorService.handleError(response);
            return { ...state, response };
        default:
            return state;
    }
};