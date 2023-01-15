import {
    GOT_AUTHORS_ERROR, GOT_AUTHORS_SUCCESS,
} from "@/store/actions/actionTypes";

export default function authorReducer(state = {}, action: any) {
    const response = action.response;

    switch(action.type) {
        case GOT_AUTHORS_SUCCESS:
            return {
                ...state,
                authors: response,
                response
            };
        case GOT_AUTHORS_ERROR:
            return { ...state, response };

        default:
            return state;
    }
};