import { TicketRoomModels } from "../../_core/models/TicketRoomModels"
import { SET_LIST_TICKET_ROOM_REDUCER, SET_LIST_CHAIR_BOOKING_REDUCER, RESET_LIST_CHAIR_BOOKING, MOVE_TAB_TICKET_BOOKING_RESULTS, CHANGE_TAB, SET_CHAIR_USER_OTHER_BOOKING } from "../types/TicketRoomTypes"

const initialState = {
    arrTicketRoom: new TicketRoomModels(),
    listChairBooking: [],
    listChairUserOtherBooking: [
        {
            daDat: false,
            giaVe: 90000,
            loaiGhe: "Vip",
            maGhe: 81581,
            maRap: 664,
            stt: "101",
            taiKhoanNguoiDat: null,
            tenGhe: "101",
        },
        {
            daDat: false,
            giaVe: 90000,
            loaiGhe: "Vip",
            maGhe: 81582,
            maRap: 664,
            stt: "101",
            taiKhoanNguoiDat: null,
            tenGhe: "101",
        },
    ],
    tabActive: '1',
}

export const TicketRoomReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST_TICKET_ROOM_REDUCER: {
            return { ...state, arrTicketRoom: action.arrTicketRoom }
        }

        case SET_LIST_CHAIR_BOOKING_REDUCER: {
            let listChairBookingUpdate = [...state.listChairBooking];
            const indexChair = listChairBookingUpdate.findIndex(chair => chair.maGhe === action.chair.maGhe);
            if (indexChair !== -1) {
                listChairBookingUpdate.splice(indexChair, 1);
            } else {
                listChairBookingUpdate.push(action.chair);
            }
            return { ...state, listChairBooking: listChairBookingUpdate }
        }

        case RESET_LIST_CHAIR_BOOKING: {
            return { ...state, listChairBooking: [] }
        }

        case MOVE_TAB_TICKET_BOOKING_RESULTS: {
            return { ...state, tabActive: '2' };
        }

        case CHANGE_TAB: {
            return { ...state, tabActive: action.number };
        }

        case SET_CHAIR_USER_OTHER_BOOKING: {
            return { ...state, listChairUserOtherBooking: action.arrChairUserOtherBooking}
        }

        default:
            return { ...state }
    }
}
