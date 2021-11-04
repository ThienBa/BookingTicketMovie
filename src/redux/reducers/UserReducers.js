import { TOKEN, USER_LOGIN } from "../../utils/settings/config"
import { InfoAccountModels } from "../../_core/models/InfoAccountModels";
import { SET_INFO_ACCOUNT_REDUCER, SET_INFO_USER_LOGIN_REDUCER } from "../types/UserTypes"

let infoUser = {};
if (localStorage.getItem(USER_LOGIN)) {
    infoUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin: infoUser,
    arrInfoAccount: new InfoAccountModels(),
}

export const UserReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO_USER_LOGIN_REDUCER: {
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.infoUserLogin));
            localStorage.setItem(TOKEN, action.infoUserLogin.accessToken);

            return { ...state, userLogin: action.infoUserLogin }
        }
        case SET_INFO_ACCOUNT_REDUCER: {
            return { ...state, arrInfoAccount: action.arrInfoAccount }
        }
        default:
            return { ...state }
    }
}
