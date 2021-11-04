import { GROUP_CODE } from "../utils/settings/config";
import { baseServices } from "./baseServices";

class ManageMovieServices extends baseServices {
    constructor() {
        super();
    }

    getListCarouselApi = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner');
    }

    getListMovieApi = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`)
    }
}

export const manageMovieServices = new ManageMovieServices();