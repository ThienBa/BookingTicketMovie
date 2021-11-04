import { baseServices } from "./baseServices";

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
}

export const manageUserServices = new ManageUserServices();