import { manageUserServices } from '../../services/ManageUserServices';
import { STATUS_CODE } from '../../utils/settings/config';
import { SET_INFO_ACCOUNT_REDUCER, SET_INFO_USER_LOGIN_REDUCER } from '../types/UserTypes';
import { history } from '../../App';
import { SweetAlertError, SweetAlertSuccess } from "../../utils/SweetAlert/SweetAlert";

export const loginApiAction = (userLogin) => {
    return async dispatch => {
        try {
            const { data, status } = await manageUserServices.loginApi(userLogin);

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_INFO_USER_LOGIN_REDUCER,
                    infoUserLogin: data.content
                })
            }

            history.goBack()
            SweetAlertSuccess('Login is successful!')
        } catch (err) {
            SweetAlertError('Username or password invalid!')
        }
    }
}

export const getInfoAccountApiAction = () => {
    return async dispatch => {
        try {
            const { data, status } = await manageUserServices.getInfoAccountApi();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_INFO_ACCOUNT_REDUCER,
                    arrInfoAccount: data.content
                })
            }
        } catch (err) {
            console.log(err)
            SweetAlertError('Error getting info account!')
        }
    }
}