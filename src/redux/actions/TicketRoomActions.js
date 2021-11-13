import { history } from '../../App';
import { manageBookTicketServices } from '../../services/ManageBookTicketServices';
import { STATUS_CODE } from '../../utils/settings/config';
import { SweetAlertError, SweetAlertSuccess } from '../../utils/SweetAlert/SweetAlert';
import { BookTicketModels } from '../../_core/models/BookTicketModels';
import { MOVE_TAB_TICKET_BOOKING_RESULTS, RESET_LIST_CHAIR_BOOKING, SET_LIST_CHAIR_BOOKING_REDUCER, SET_LIST_TICKET_ROOM_REDUCER, CHANGE_TAB } from '../types/TicketRoomTypes';
import { displayLoadingAction, hideLoadingAction } from './LoadingActions';

export const changeTableAction = (number) => ({
    type: CHANGE_TAB,
    number
})

export const setChairBookingAction = (chair) => {
    return async (dispatch) => {
        dispatch({
            type: SET_LIST_CHAIR_BOOKING_REDUCER,
            chair
        })
    }
}

export const getListTicketRoomApiAction = (idShowtime) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { data, status } = await manageBookTicketServices.getListTicketRoomApi(idShowtime);

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_TICKET_ROOM_REDUCER,
                    arrTicketRoom: data.content
                })
            }
        } catch (err) {
            SweetAlertError('Error getting list ticket room!')
        }
        dispatch(hideLoadingAction())
    }
}

export const bookTicketApiAction = (infoBookTicket = new BookTicketModels()) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { status } = await manageBookTicketServices.bookTicketApi(infoBookTicket);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch(getListTicketRoomApiAction(infoBookTicket.maLichChieu))
                await dispatch({
                    type: RESET_LIST_CHAIR_BOOKING
                })
                await dispatch({
                    type: MOVE_TAB_TICKET_BOOKING_RESULTS
                })
                await SweetAlertSuccess('Book ticket successful!')
            }
        } catch (err) {
            SweetAlertError('Error booking ticket!')
        }

        dispatch(hideLoadingAction())
    }
}

export const createShowtimesApiAction = (newShowtimes) => {
    return async dispatch => {
        dispatch(displayLoadingAction())

        try {
            const { status } = await manageBookTicketServices.createShowtimesApi(newShowtimes);
            if (status === STATUS_CODE.SUCCESS) {
                history.push('/admin/movies')
                SweetAlertSuccess('Create showtimes successful!')
            }
        } catch (err) {
            SweetAlertError('Error create showtimes!')
        }

        dispatch(hideLoadingAction())
    }
}