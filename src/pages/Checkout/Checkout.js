import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookTicketApiAction, changeTableAction, getListTicketRoomApiAction, setChairBookingAction } from '../../redux/actions/TicketRoomActions';
import './Checkout.css';
import { CloseOutlined, UserOutlined, DownOutlined, LogoutOutlined, UsergroupAddOutlined, CheckOutlined, HomeOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { BookTicketModels } from '../../_core/models/BookTicketModels';
import { Tabs, Menu, Dropdown } from 'antd';
import { history } from '../../App';
import { SweetAlertSuccess } from '../../utils/SweetAlert/SweetAlert';
import moment from 'moment';
import { getInfoAccountApiAction } from '../../redux/actions/UserActions';
import { USER_LOGIN, TOKEN } from '../../utils/settings/config';
import { useTranslation } from 'react-i18next';
// import { connection } from '../../index';
// import { SET_CHAIR_USER_OTHER_BOOKING } from '../../redux/types/TicketRoomTypes';


const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const { TabPane } = Tabs;

function Checkout(props) {
    const { arrTicketRoom, listChairBooking, listChairUserOtherBooking } = useSelector(state => state.TicketRoomReducers);
    const { userLogin } = useSelector(state => state.UserReducers);
    const { danhSachGhe, thongTinPhim } = arrTicketRoom;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListTicketRoomApiAction(props.match.params.id))
        // connection.on('datVeThanhCong', ()=>{
        //      //If there is a user who successfully booked the ticket => reload get list ticket of that showtime
        //      dispatch(getListTicketRoomApiAction(props.match.params.id))
        //  })
        //  //Just entered the page to load all the chairs other people are booking
        //   connection.invoke('loadDanhSachGhe', props.match.params.id)
        //Load the list of chairs being ordered from the server
        // connection.on('loadDanhSachGheDaDat', (listChairUserOtherBooking) => {
        //     //Step 1: Remove yourself from the list
        //      listChairUserOtherBooking = listChairUserOtherBooking.filter(chairUserOtherBooking => chairUserOtherBooking.taiKhoan !== userLogin.taiKhoan)
        //      //Step 2: Merge array of other users booking
        //      let arrChairUserOtherBooking = listChairUserOtherBooking.reduce((result, item, index)=>{
        //              const listChair = JSON.parse(item);
        //             return [...result, ...listChair];
        //      },[])
        //
        //      //Step 3: Remove duplicate elements
        //      arrChairUserOtherBooking = _.uniqBy(arrChairUserOtherBooking, ['maGhe']);
        //
        //      //Step 4: Dispath to reducer
        //      dispatch({
        //             type: SET_CHAIR_USER_OTHER_BOOKING,
        //             arrChairUserOtherBooking
        //      })
        // })
        //       //Event settings reload page => clear chair booking
        //      window.addEventListener("beforeunload", clearGhe);
        //
        //      return ()=>{
        //          //When turning pages => clear chair booking
        //          clearGhe();
        //          window.removeEventListener("beforeunload", clearGhe);
        //      }
    }, [])

    // const clearGhe = function () {
    //     connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);
    // }

    const renderChair = () => {
        return danhSachGhe.map((chair, index) => {
            const classChairBooked = chair.daDat ? "chairBooked" : "";
            const classChairVip = chair.loaiGhe === "Vip" ? "chairVip" : "";
            const classUserLoginBooked = chair.taiKhoanNguoiDat === userLogin.taiKhoan ? "chairUserLoginBooked" : "";
            let classChairBooking = "";
            let classChairUserOtherBooking = "";

            const indexChairUserOtherBooking = listChairUserOtherBooking.findIndex(chairUserOther => chairUserOther.maGhe === chair.maGhe);
            if (indexChairUserOtherBooking !== -1) {
                classChairUserOtherBooking = "chairUserOtherBooking";
            }

            const indexChair = listChairBooking.findIndex(chairBooking => chairBooking.maGhe === chair.maGhe);
            if (indexChair !== -1) {
                classChairBooking = 'chairBooking';
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch(setChairBookingAction(chair, props.match.params.id))
                }} disabled={chair.daDat || classChairUserOtherBooking} className={`text-white font-bold chair ${classChairBooked} ${classChairVip} ${classChairBooking} ${classUserLoginBooked} ${classChairUserOtherBooking}`}>
                    {chair.daDat ? classUserLoginBooked ?
                        <UserOutlined style={flexCenter} /> :
                        <CloseOutlined style={flexCenter} /> :
                        classChairUserOtherBooking ?
                            <UsergroupAddOutlined style={flexCenter} /> :
                            chair.tenGhe}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
        })
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-9 mt-2">
                <div className="flex flex-col items-center">
                    <div className="border-8 border-black" style={{ width: '80%' }}></div>
                    <div className="trapezoid text-center">
                        {t('screen')}
                    </div>
                    <div>
                        {renderChair()}
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <table className="table  border-separate space-y-6 text-sm">
                        <thead>
                            <tr>
                                <th className="px-3 text-green-300">{t('chairNotBoooked')}</th>
                                <th className="px-3 text-green-300">{t('chairBooking')}</th>
                                <th className="px-3 text-green-300">{t('chairUserOtherBooking')}</th>
                                <th className="px-3 text-green-300">{t('chairVip')}</th>
                                <th className="px-3 text-green-300">{t('chairBooked')}</th>
                                <th className="px-3 text-green-300">{t('chairUserLoginBooked')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center text-white">
                                    <button className="chair">
                                        <CheckOutlined style={flexCenter} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="chair chairBooking text-white">
                                        <CheckOutlined style={flexCenter} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="chair chairUserOtherBooking">
                                        <UsergroupAddOutlined style={flexCenter} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="chair chairVip text-white">
                                        <CheckOutlined style={flexCenter} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="chair chairBooked text-white">
                                        <CloseOutlined style={flexCenter} />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="chair chairUserLoginBooked">
                                        <UserOutlined style={flexCenter} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="col-span-3  px-5 border-l">
                <div className="border-b py-1">
                    <h1 className="text-green-400 font-bold text-center text-xl m-0">
                        {listChairBooking.reduce((total, chair, index) => {
                            return total += (chair.giaVe);
                        }, 0).toLocaleString()}
                        đ
                    </h1>
                </div>
                <div className="border-b py-3">
                    <h4 className="font-bold m-0">{thongTinPhim.tenPhim}</h4>
                    <p className="m-0">{thongTinPhim.tenCumRap}</p>
                    <p className="m-0">{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
                </div>
                <div className="border-b font-bold py-3 flex justify-between">
                    <div>
                        <span className="text-red-600">Chair</span>
                        {_.sortBy(listChairBooking, chair => +chair.stt).map((chair, index) => {
                            return <Fragment key={index}>
                                <span className="ml-2 mt-1 text-green-600 border border-green-600 px-1 rounded-md">{chair.stt}</span>
                                {(index + 1) % 6 === 0 ? <br /> : ""}
                            </Fragment>
                        })}
                    </div>
                    <span className="text-green-400">
                        {listChairBooking.reduce((total, chair, index) => {
                            return total += (chair.giaVe);
                        }, 0).toLocaleString()}
                        đ</span>
                </div>
                <div className="border-b  py-3">
                    <p className="m-0 text-gray-400">E-Mail</p>
                    <p className="m-0">{userLogin.email}</p>
                </div>
                <div className="border-b  py-3">
                    <p className="m-0 text-gray-400">Phone</p>
                    <p className="m-0">{userLogin.soDT}</p>
                </div>
                <div>
                    {_.size(listChairBooking) > 0 ? <button onClick={() => {
                        let infoBookTicket = new BookTicketModels();
                        infoBookTicket.maLichChieu = props.match.params.id;
                        infoBookTicket.danhSachVe = listChairBooking;
                        dispatch(bookTicketApiAction(infoBookTicket))
                    }} className="w-full mt-10 hover:bg-red-400 bg-red-500 transition duration-500 font-bold text-white py-2 rounded-xl">
                        Book tickets
                    </button> : ""}
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
    const { userLogin } = useSelector(state => state.UserReducers);
    const { tabActive } = useSelector(state => state.TicketRoomReducers);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(changeTableAction('1'))
        }
    }, [])

    return (
        <div className="px-2">
            <Tabs defaultActiveKey={1} activeKey={tabActive} tabBarStyle={{ boxShadow: '0px 20px 10px -1px rgba(116,116,116,0.12)' }} tabBarExtraContent={
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="1" />
                    <p className="ml-2 mb-0 font-bold text-green-600">
                        {userLogin.hoTen}
                    </p>
                    <Dropdown.Button overlay={
                        <Menu >
                            <Menu.Item onClick={() => {
                                history.push('/profile')
                            }} key="1" icon={<UserOutlined />}>
                                {t('profile')}
                            </Menu.Item>
                            <Menu.Item onClick={() => {
                                localStorage.removeItem(USER_LOGIN);
                                localStorage.removeItem(TOKEN);
                                history.push('/home')
                                SweetAlertSuccess('You are logged out.')
                                window.location.reload();
                            }} key="2" icon={<LogoutOutlined />}>
                                {t('logout')}
                            </Menu.Item>
                        </Menu>} placement="bottomCenter" icon={<DownOutlined />}>
                    </Dropdown.Button>
                </div>
            } onChange={(key) => {
                dispatch(changeTableAction(key))
            }}>
                <TabPane tab={<h1 className="font-bold ml-5 mb-0 text-2xl text-blue-500" onClick={() => {
                    history.push('/home')
                }}><HomeOutlined /></h1>} key="home"></TabPane>
                <TabPane tab={<h1 className="font-bold m-0">01 | {t('choseChair')}</h1>} key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab={<h1 className="font-bold m-0">02 | {t('ticketBookingResults')}</h1>} key="2">
                    <ResultBookTicket />
                </TabPane>
            </Tabs>
        </div>
    )
}

function ResultBookTicket() {
    const { arrInfoAccount } = useSelector(state => state.UserReducers);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getInfoAccountApiAction())
    }, [])

    const renderResultBookTicket = () => {
        return arrInfoAccount.thongTinDatVe.map((infoTicket, index) => {
            const CHAIRS_LODASH = _.first(infoTicket.danhSachGhe);

            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt={infoTicket.tenPhim} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={infoTicket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium m-0">{infoTicket.tenPhim}</h2>
                        <p className="text-gray-500 m-0">{moment(infoTicket.ngayChieu).format('hh:mm A')} - {moment(infoTicket.ngayChieu).format('DD/MM/YYYY')}</p>
                        <p className="m-0">{CHAIRS_LODASH.tenHeThongRap}</p>
                        <p className="m-0">
                            {CHAIRS_LODASH.tenCumRap} -
                            <span className="font-bold"> {t('chair')}:</span>
                            {infoTicket.danhSachGhe.map((chair, index) => {
                                return <span key={index} className="border border-green-500 text-green-500 px-2 rounded-lg mx-1">{chair.tenGhe}</span>;
                            })}</p>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">{t('yourBookingResult')}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{t('haveAGoodTimeWatchingTheMovie')}</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderResultBookTicket()}
                </div>
            </div>
        </section>

    )
}
