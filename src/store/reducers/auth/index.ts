import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS} from "@/store/actions/actionTypes";
import TokenService from "@/services/token.service";

export default function authReducer(state = {}, action: any) {
    const response = action.response;

    switch(action.type) {
        case LOGIN_USER_SUCCESS:
            console.log(LOGIN_USER_SUCCESS, response)

            TokenService.updateLocalAccessToken(response.access_token);
            TokenService.updateLocalRefreshToken(response.refresh_token);

            return { ...state, response };
        case LOGIN_USER_ERROR:
            return { ...state, response };
        default:
            return state;
    }
};