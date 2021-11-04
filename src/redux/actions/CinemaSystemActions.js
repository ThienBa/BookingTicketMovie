import { manageCinemaServices } from "../../services/ManageCinemaServices";
import { STATUS_CODE } from "../../utils/settings/config";
import { SET_DETAIL_MOVIE_REDUCER, SET_THEATER_SYSTEM_REDUCER } from "../types/CinemaSystemTypes";
import { SweetAlertError } from "../../utils/SweetAlert/SweetAlert";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";

export const getCinemaSystemApiActions = () => {
    return async dispatch => {
        try {
            const { data, status } = await manageCinemaServices.getCinemaSystemApi();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THEATER_SYSTEM_REDUCER,
                    arrCinemaSystem: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error getting cinema system!')
        }
    }
}

export const getMovieShowtimeInfoApiActions = (idMovie) => {
    return async dispatch => {
        dispatch(displayLoadingAction())
        try {
            const { data, status } = await manageCinemaServices.getMovieShowtimeInfoApi(idMovie);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DETAIL_MOVIE_REDUCER,
                    movieDetail: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error getting movie showtime info!')
        }
        dispatch(hideLoadingAction())
    }
}