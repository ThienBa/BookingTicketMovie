import { manageMovieServices } from "../../services/ManageMovieServices";
import { STATUS_CODE } from "../../utils/settings/config";
import { GET_LIST_MOVIE_REDUCER, SET_INFO_MOVIE_REDUCER } from "../types/MovieTypes";
import { SweetAlertError, SweetAlertSuccess } from "../../utils/SweetAlert/SweetAlert";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { history } from "../../App";

export const getListMovieApiActions = (keyword = "") => {
    return async dispatch => {
        if (!keyword) {
            dispatch(displayLoadingAction())
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        try {
            const { data, status } = await manageMovieServices.getListMovieApi(keyword);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_LIST_MOVIE_REDUCER,
                    arrMovie: data.content,
                })
            }
        } catch (err) {
            SweetAlertError('Error getting movie list!')
        }

        dispatch(hideLoadingAction())
    }
}

export const addMovieUploadImageApiAction = (formData) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { status } = await manageMovieServices.addMovieUploadImageApi(formData);
            if (status === STATUS_CODE.SUCCESS) {
                SweetAlertSuccess('Add movie successful!')
                history.push('/admin/movies')
            }
        } catch (err) {
            SweetAlertError('Error add new movie!')
        }

        dispatch(hideLoadingAction())
    }
}

export const getInfoMovieApiAction = (movieCode) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { data, status } = await manageMovieServices.getInfoMovieApi(movieCode);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_INFO_MOVIE_REDUCER,
                    infoMovie: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error add new movie!')
        }

        dispatch(hideLoadingAction())
    }
}

export const updateMovieUploadApiAction = (formData) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { status } = await manageMovieServices.updateMovieUploadApi(formData);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getListMovieApiActions())
                SweetAlertSuccess('Update movie successful!')
                history.push('/admin/movies')
            }
        } catch (err) {
            SweetAlertError('Error update movie!')
        }

        dispatch(hideLoadingAction())
    }
}

export const deleteMovieApiAction = (movieCode) => {
    return async dispatch => {
        try {
            const { status } = await manageMovieServices.deleteMovieApi(movieCode);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getListMovieApiActions())
                SweetAlertSuccess('Delete movie successful!')
            }
        } catch (err) {
            SweetAlertError('Error update movie!')
        }
    }
}
