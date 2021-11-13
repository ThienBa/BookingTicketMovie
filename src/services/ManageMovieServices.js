import { GROUP_CODE } from "../utils/settings/config";
import { baseServices } from "./baseServices";

class ManageMovieServices extends baseServices {
    constructor() {
        super();
    }

    getListCarouselApi = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner');
    }

    getListMovieApi = (keyword = "") => {
        if (keyword.trim() !== "") {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}&tenPhim=${keyword}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`)
    }

    addMovieUploadImageApi = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }

    getInfoMovieApi = (movieCode) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`);
    }

    updateMovieUploadApi = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
    }

    deleteMovieApi = (movieCode) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`);
    }
}

export const manageMovieServices = new ManageMovieServices();