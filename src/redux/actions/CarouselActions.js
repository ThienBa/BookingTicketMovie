import { GET_DATA_CAROUSEL_REDUCER } from "../types/CarouselTypes";
import { manageMovieServices } from "../../services/ManageMovieServices";
import { STATUS_CODE } from "../../utils/settings/config";
import { SweetAlertError } from "../../utils/SweetAlert/SweetAlert";

export const getListCarouselApiActions = () => {
    return async dispatch => {
        try {
            const { data, status } = await manageMovieServices.getListCarouselApi();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_DATA_CAROUSEL_REDUCER,
                    arrCarousel: data.content,
                })
            }
        } catch (err) {
            SweetAlertError('Error getting carousel list!')
        }
    }
}