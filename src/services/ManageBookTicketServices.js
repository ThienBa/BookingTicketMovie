import { BookTicketModels } from "../_core/models/BookTicketModels";
import { baseServices } from "./baseServices";

class ManageBookTicketServices extends baseServices {
    constructor() {
        super();
    }

    getListTicketRoomApi = (idShowtime) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtime}`);
    }

    bookTicketApi = (infoBookTicket = new BookTicketModels()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, infoBookTicket);
    }
}

export const manageBookTicketServices = new ManageBookTicketServices();