import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    english: {
        translation: {
            "signin": "Sign in",
            "signup": "Sign up",
            "logout": "Logout",
            "profile": "Profile",
            "home": "Home",
            "news": "News",
            "showtimes": "Showtimes",
            "contact": "Contact",
            "showing": 'Showing',
            "commingSoon": 'Comming Soon',
            "termsOfUse": 'Terms of use',
            "privacyPolicy": 'Privacy policy',
            "partner": 'Partner',
            "mobileApp": 'Mobile App',
            "social": 'Social',
            "copyright": 'Copyright',
            "allRightsReserved": 'All Rights Reserved',
            "buyTicket": 'Buy ticket',
            "info": 'Info',
            "rate": 'Rate',
            "chair": 'Chair',
            "choseChair": 'Choose Chair',
            "ticketBookingResults": 'Ticket Booking Result',
            "chairNotBoooked": 'Chair not booked',
            "chairBooking": 'Chair booking',
            "chairUserOtherBooking": 'Chair user other booking',
            "chairVip": 'Chair vip',
            "chairBooked": 'Chair booked',
            "chairUserLoginBooked": 'Chair user login booked',
            "screen": 'Screen',
            "yourBookingResult": 'Your booked result',
            "haveAGoodTimeWatchingTheMovie": 'Have a good time watching the movie.'
        }
    },
    japan: {
        translation: {
            "signin": "ログイン",
            "signup": "サインアップ",
            "logout": "ログアウト",
            "profile": "プロフィール",
            "home": "家",
            "news": "ニュース",
            "showtimes": "上映時間",
            "contact": "コンタクト",
            "showing": '表示中',
            "commingSoon": '近日公開',
            "termsOfUse": '利用規約',
            "privacyPolicy": 'プライバシーポリシー',
            "partner": '相棒',
            "mobileApp": 'モバイルアプリ',
            "social": 'ソーシャル',
            "copyright": '著作権',
            "allRightsReserved": '全著作権所有。',
            "buyTicket": 'チケットを購入する',
            "info": '情報',
            "rate": '割合',
            "chair": '椅子',
            "choseChair": '椅子を選びました',
            "ticketBookingResults": 'チケット予約結果',
            "chairNotBoooked": '椅子が予約されていませ',
            "chairBooking": 'ん椅子の予約',
            "chairUserOtherBooking": 'チェアユーザーその他の予約',
            "chairVip": 'チェアvip',
            "chairBooked": '予約済みの椅子',
            "chairUserLoginBooked": 'チェアユーザーのログインが予約されました',
            "screen": '画面',
            "yourBookingResult": '予約結果',
            "haveAGoodTimeWatchingTheMovie": '映画を見て楽しい時間を過ごしてください。'
        }
    },
    vietnamese: {
        translation: {
            "signin": "Đăng nhập",
            "signup": "Đăng kí",
            "logout": "Đăng xuất",
            "profile": "Hồ sơ",
            "home": "Trang chủ",
            "news": "Tin tức",
            "showtimes": "Lịch chiếu",
            "contact": "Liên hệ",
            "showing": 'Đang chiếu',
            "commingSoon": 'Sắp chiếu',
            "termsOfUse": 'Điều khoảng sử dụng',
            "privacyPolicy": 'Chính sách bảo mật',
            "partner": 'Đối tác',
            "mobileApp": 'Ứng dụng di động',
            "social": 'Mạng xã hội',
            "copyright": 'Bản quyền',
            "allRightsReserved": 'Đã đăng kí bản quyền',
            "buyTicket": 'Mua vé',
            "info": 'Thông tin',
            "rate": 'Đánh giá',
            "choseChair": 'Chọn Ghế',
            "chair": 'Ghế',
            "ticketBookingResults": 'Kết quả đặt vé',
            "chairNotBoooked": 'Ghế chưa đặt',
            "chairBooking": 'Ghế đang đặt',
            "chairUserOtherBooking": 'Ghế người dùng khác đang đặt',
            "chairVip": 'Ghế vip',
            "chairBooked": 'Ghế đã được đặt',
            "chairUserLoginBooked": 'Ghế bạn đặt',
            "screen": 'Màn hình',
            "yourBookingResult": 'Kết quả đặt vé của bạn',
            "haveAGoodTimeWatchingTheMovie": 'Chúc các bạn xem phim vui vẻ.'
        }
    },
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "english",
        interpolation: {
            escapeValue: false
        }
    });
export default i18n;