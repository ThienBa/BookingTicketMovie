import { manageMovieServices } from "../../services/ManageMovieServices";
import { STATUS_CODE } from "../../utils/settings/config";
import { GET_LIST_MOVIE_REDUCER, SET_MOVIE_COMMING_SOON_REDUCER, SET_MOVIE_SHOWING_REDUCER } from "../types/MovieTypes";
import { SweetAlertError } from "../../utils/SweetAlert/SweetAlert";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";

export const getListMovieApiActions = () => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { data, status} = await manageMovieServices.getListMovieApi();
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

export const setShowingMovieActions = () => ({
    type: SET_MOVIE_SHOWING_REDUCER
})

export const setCommingSoonMovieActions = () => ({
    type: SET_MOVIE_COMMING_SOON_REDUCER
})

