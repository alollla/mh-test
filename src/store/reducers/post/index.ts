import {
    ADD_POST_ERROR,
    ADD_POST_SUCCESS, EDIT_POST_ERROR, EDIT_POST_SUCCESS,
    GOT_POST_DETAILS__ERROR,
    GOT_POST_DETAILS_SUCCESS,
    GOT_POSTS_ERROR,
    GOT_POSTS_SUCCESS, REMOVE_POST_ERROR, REMOVE_POST_SUCCESS
} from "@/store/actions/actionTypes";
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

        case GOT_POST_DETAILS_SUCCESS:
            return {
                ...state,
                details: response,
                response
            };
        case GOT_POST_DETAILS__ERROR:
            return { ...state, response };

        case ADD_POST_SUCCESS:
            return {
                ...state,
                response
            };
        case ADD_POST_ERROR:
            return { ...state, response };

        case EDIT_POST_SUCCESS:
            return {
                ...state,
                response
            };
        case EDIT_POST_ERROR:
            return { ...state, response };

        case REMOVE_POST_SUCCESS:
            return {
                ...state,
                response
            };
        case REMOVE_POST_ERROR:
            return { ...state, response };

        default:
            return state;
    }
};