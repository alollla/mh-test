import {
    GOT_TAGS_ERROR, GOT_TAGS_SUCCESS,
} from "@/store/actions/actionTypes";

export default function tagReducer(state = {}, action: any) {
    const response = action.response;

    switch(action.type) {
        case GOT_TAGS_SUCCESS:
            return {
                ...state,
                tags: response,
                response
            };
        case GOT_TAGS_ERROR:
            return { ...state, response };

        default:
            return state;
    }
};