import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoAccountApiAction, updateInfoPutUserApiAction } from '../../redux/actions//UserActions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useFormik } from 'formik';
import { GROUP_CODE } from '../../utils/settings/config';
import { NavLink } from 'react-router-dom';
import { ValidationFormUser } from '../../utils/ValidationForm/ValidationFormUser';
const { TabPane } = Tabs;


export default function Profile() {
    const { arrInfoAccount } = useSelector(state => state.UserReducers);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [displayInput, setDisplayInput] = useState(false);

    useEffect(() => {
        dispatch(getInfoAccountApiAction())
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: ValidationFormUser(),
        initialValues: {
            taiKhoan: arrInfoAccount.taiKhoan,
            matKhau: arrInfoAccount.matKhau,
            email: arrInfoAccount.email,
            soDt: arrInfoAccount.soDT,
            maNhom: GROUP_CODE,
            hoTen: arrInfoAccount.hoTen,
            maLoaiNguoiDung: "KhachHang"
        },
        onSubmit: async values => {
            await dispatch(updateInfoPutUserApiAction(values));
        }
    })


    const renderBookingHistory = () => {
        if (_.size(arrInfoAccount.thongTinDatVe) > 0) {
            return arrInfoAccount.thongTinDatVe.map((infoTicket, index) => {
                const CHAIRS_LODASH = _.first(infoTicket.danhSachGhe);
                return <div key={index} className="w-full mb-2 text-white col-span-4">
                    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt={infoTicket.tenPhim} className="w-24 h-24 bg-gray-100 object-cover object-center flex-shrink-0  mr-4" src={infoTicket.hinhAnh} />
                        <div className="flex-grow">
                            <h2 className="text-green-500 title-font font-medium m-0">{infoTicket.tenPhim}</h2>
                            <p className="text-gray-500 m-0">{t('bookingDate')}: {moment(infoTicket.ngayDat).format('DD/MM/YYYY hh:mm A')}</p>
                            <p className="text-gray-500 m-0">{t('showDate')}: {moment(infoTicket.ngayChieu).format('DD/MM/YYYY hh:mm A')}</p>
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
        return <p className="text-white col-span-12">You have not booked a ticket. Click <NavLink to="/home">here</NavLink> to choose your ticket!</p>
    }

    return (
        <div style={{ backgroundImage: `url(${require('../../assets/images/BgProfile.jpg').default})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', height: '600px' }}>
            <div style={{
                margin: '0 auto',
                background: 'rgba(16,18,27,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '10px',
                backdropFilter: 'blur(2px)',
                color: 'white',
                height: '100%',
            }}>
                <div className="flex items-center justify-center h-full">
                    <Tabs defaultActiveKey="1" className="border rounded-sm" style={{ padding: '10px 20px', minWidth: 600 }}>
                        <TabPane tab={<div className="text-white">{t('personalInfomation')}</div>} key="1">
                            <form className="text-white px-10" onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-6 mr-3">
                                        <div className="flex gap-1 justify-between">
                                            <label htmlFor="email" className="font-bold">{t('email')}: </label>
                                            <div>
                                                {displayInput ? <input
                                                    className={`${formik.touched.email && Boolean(formik.errors.email) ? 'border-red-500 bg-red-100' : null} w-60 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                /> : <p>{arrInfoAccount.email}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 justify-between my-3">
                                            <label htmlFor="hoTen" className="font-bold">{t('fullname')}: </label>
                                            <div>
                                                {displayInput ? <input className={`${formik.touched.hoTen && Boolean(formik.errors.hoTen) ? 'border-red-500 bg-red-100' : null} w-60 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`} type="text" name="hoTen" id="hoTen"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.hoTen} /> : <p>{arrInfoAccount.hoTen}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 justify-between">
                                            <label htmlFor="soDt" className="font-bold">{t('phoneNumber')}: </label>
                                            <div>
                                                {displayInput ? <input className={`${formik.touched.soDt && Boolean(formik.errors.soDt) ? 'border-red-500 bg-red-100' : null} w-60 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`} type="text" name="soDt" id="soDt"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.soDt}
                                                /> : <p>{arrInfoAccount.soDT}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 ml-3">
                                        <div className="flex gap-1 justify-between">
                                            <label htmlFor="taiKhoan" className="font-bold">{t('username')}: </label>
                                            <p>{arrInfoAccount.taiKhoan}</p>
                                        </div>
                                        <div className="flex gap-1 my-3 justify-between">
                                            <label htmlFor="matKhau" className="font-bold">{t('password')}: </label>
                                            <div>
                                                {displayInput ? <input type="password" className={`${formik.touched.matKhau && Boolean(formik.errors.matKhau) ? 'border-red-500 bg-red-100' : null} w-60 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`} name="matKhau" id="matKhau"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.matKhau} /> : <p>************</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {displayInput ? <button type="submit" className="rounded-lg mt-3 px-3 py-1 font-medium bg-green-500">{t('update')}</button> : <div onClick={() => {
                                        setDisplayInput(true)
                                    }} className="underline text-green-500 font-medium cursor-pointer">{t('editInfo')}</div>}
                                </div>
                            </form>
                        </TabPane>
                        <TabPane tab={<div className="text-white">{t('bookingHistory')}</div>} key="2">
                            <div className="grid grid-cols-12 gap-2">
                                {renderBookingHistory()}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
