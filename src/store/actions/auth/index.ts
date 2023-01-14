import {LOGIN_USER} from "@/store/actions/actionTypes";

export function loginUserAction (form:any) {
    return {
        type: LOGIN_USER,
        form
    }
}