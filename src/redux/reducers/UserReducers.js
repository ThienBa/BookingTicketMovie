import { TOKEN, USER_LOGIN } from "../../utils/settings/config"
import { InfoAccountModels } from "../../_core/models/InfoAccountModels";
import { SET_INFO_ACCOUNT_REDUCER, SET_INFO_USER_LOGIN_REDUCER, SET_LIST_TYPE_USER_REDUCER, SET_LIST_USER_REDUCER, SET_USER_EDIT_REDUCER } from "../types/UserTypes"

let infoUser = {};
if (localStorage.getItem(USER_LOGIN)) {
    infoUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin: infoUser,
    arrInfoAccount: new InfoAccountModels(),
    arrListUser: [],
    arrListTypeUser: [],
    userEdit: [],
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

        case SET_LIST_USER_REDUCER: {
            return { ...state, arrListUser: action.arrListUser }
        }

        case SET_LIST_TYPE_USER_REDUCER: {
            return { ...state, arrListTypeUser: action.arrListTypeUser }
        }

        case SET_USER_EDIT_REDUCER: {
            return { ...state, userEdit: action.userEdit }
        }

        default:
            return { ...state }
    }
}
