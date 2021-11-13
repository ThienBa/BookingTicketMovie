import { baseServices } from "./baseServices";
import { GROUP_CODE } from "../utils/settings/config";

class ManageUserServices extends baseServices {
    constructor() {
        super();
    }

    loginApi = (userLogin) => {
        return this.post('/api/QuanLyNguoiDung/DangNhap', userLogin);
    }

    getInfoAccountApi = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    registerAccountApi = (newAccount) => {
        return this.post('/api/QuanLyNguoiDung/DangKy', newAccount);
    }

    updateInfoUserPutApi = (infoUpdate) => {
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', infoUpdate);
    }

    getListUserApi = (keyword = null) => {
        if (keyword) {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_CODE}&tuKhoa=${keyword}`);
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_CODE}`);
    }

    getListTypeUserApi = () => {
        return this.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
    }

    addUserApi = (newUser) => {
        return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', newUser);
    }

    deleteUserApi = (userName) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`);
    }

    updateInfoUserPostApi = (userUpdate) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userUpdate);
    }
}

export const manageUserServices = new ManageUserServices();