export class TicketRoomModels {
    danhSachGhe = [];
    thongTinPhim = new ThongTinPhim();
}

class DanhSachGhe {
    maGhe = 0;
    tenGhe = "";
    maRap = 452;
    loaiGhe = "";
    stt = 0;
    giaVe = 0;
    daDat = false;
    taiKhoanNguoiDat = null
}

class ThongTinPhim {
    maLichChieu = 0;
    tenCumRap = "";
    tenRap = "";
    diaChi = "";
    tenPhim = "";
    hinhAnh = "";
    ngayChieu = "";
    gioChieu = ""
}