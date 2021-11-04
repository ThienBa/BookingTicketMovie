import { GROUP_CODE } from "../utils/settings/config";
import { baseServices } from "./baseServices";

class ManageCinemaServices extends baseServices {
    constructor() {
        super();
    }

    getCinemaSystemApi = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_CODE}`);
    }
    
    getMovieShowtimeInfoApi = (idMovie) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idMovie}`);
    }
}

export const manageCinemaServices = new ManageCinemaServices();