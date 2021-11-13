import { manageUserServices } from '../../services/ManageUserServices';
import { STATUS_CODE } from '../../utils/settings/config';
import { SET_INFO_ACCOUNT_REDUCER, SET_INFO_USER_LOGIN_REDUCER, SET_LIST_TYPE_USER_REDUCER, SET_LIST_USER_REDUCER } from '../types/UserTypes';
import { history } from '../../App';
import { SweetAlertError, SweetAlertSuccess } from "../../utils/SweetAlert/SweetAlert";
import { displayLoadingAction, hideLoadingAction } from './LoadingActions';
import { SET_USER_EDIT_REDUCER } from '../types/UserTypes';


export const setUserEditAction = (userEdit) => ({
    type: SET_USER_EDIT_REDUCER,
    userEdit
})

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

            history.push('/home')
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
            SweetAlertError('Error getting info account!')
        }
    }
}

export const registerAccountApiAction = (newAccount) => {
    return async () => {
        try {
            const { status } = await manageUserServices.registerAccountApi(newAccount);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/login')
                SweetAlertSuccess('Create account successful. Login to continue!')
            }
        } catch (err) {
            SweetAlertError('Username or email already exists!')
        }
    }
}

export const updateInfoPutUserApiAction = (infoUpdate) => {
    return async dispatch => {
        try {
            const { status } = await manageUserServices.updateInfoUserPutApi(infoUpdate);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getInfoAccountApiAction())
                SweetAlertSuccess('Update info account successful')
            }
        } catch (err) {
            SweetAlertError('Email already exists!')
        }
    }
}

export const getListUserApiAction = (keyword = null) => {
    return async dispatch => {
        if (!keyword) {
            dispatch(displayLoadingAction())
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        try {
            const { data, status } = await manageUserServices.getListUserApi(keyword);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_USER_REDUCER,
                    arrListUser: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error get list user!')
        }

        dispatch(hideLoadingAction())
    }
}

export const getListTypeUserApiAction = () => {
    return async dispatch => {

        try {
            const { data, status } = await manageUserServices.getListTypeUserApi();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_TYPE_USER_REDUCER,
                    arrListTypeUser: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error get list type user!')
        }
    }
}

export const addUserApiAction = (newUser) => {
    return async () => {

        try {
            const { status } = await manageUserServices.addUserApi(newUser);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/admin/users')
                SweetAlertSuccess('Add user successful!')
            }
        } catch (err) {
            SweetAlertError('Username or email already exists!')
        }
    }
}

export const deleteUserApiAction = (userName) => {
    return async dispatch => {

        try {
            const { status } = await manageUserServices.deleteUserApi(userName);
            if (status === STATUS_CODE.SUCCESS) {
                SweetAlertSuccess('Delete user successful!')
                dispatch(getListUserApiAction())
            }
        } catch (err) {
            SweetAlertError('This user has booked a movie ticket that cannot be deleted!')
        }
    }
}

export const updateInfoPostUserApiAction = (infoUpdate) => {
    return async () => {
        try {
            const { status } = await manageUserServices.updateInfoUserPostApi(infoUpdate);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/admin/users')
                SweetAlertSuccess('Update info account successful')
            }
        } catch (err) {
            SweetAlertError('Email already exists!')
        }
    }
}