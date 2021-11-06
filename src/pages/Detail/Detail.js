import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import '../../assets/styles/PercentageCircle.css';
import { Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieShowtimeInfoApiActions } from '../../redux/actions/CinemaSystemActions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;

export default function Detail(props) {
    const { t } = useTranslation();
    const { movieDetail } = useSelector(state => state.CinemaSystemReducers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieShowtimeInfoApiActions(props.match.params.id));
    }, [])


    return (
        <div style={{ backgroundImage: `url(${movieDetail.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
            <CustomCard
                style={{ minHeight: '100vh' }}
                effectColor="#fff"
                color="#fff"
                blur={20}
                borderRadius={0}
            >
                <div className="grid grid-cols-12 mt-48">
                    <div className="col-span-4 col-start-3 col-end-8">
                        <div className="grid grid-cols-3 gap-5">
                            <img className="w-full" src={movieDetail.hinhAnh} alt={movieDetail.tenPhim} />
                            <div className="col-span-2">
                                <div className="flex items-center h-full">
                                    <div className="font-bold">
                                        <p className="m-0 font-semibold">{moment(movieDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                        <p className="text-xl">{movieDetail.tenPhim}</p>
                                        <p className="font-thin">{movieDetail.moTa}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 col-start-10 col-end-11">
                        <div className="grid grid-rows-2 h-full text-center" >
                            <div className={`c100 p${movieDetail.danhGia * 10} dark big orange`} style={{ marginTop: '40%' }}>
                                <span>{movieDetail.danhGia * 10}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <div>
                                <Rate style={{ color: '#EF4444' }} allowHalf value={movieDetail.danhGia / 2} />
                                <p className="text-center font-bold">{t('rate')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 mt-20">
                    <div className="col-span-12 col-start-3 col-end-11 bg-white rounded-sm" >
                        <Tabs tabPosition='top' centered style={{ minHeight: '300px' }}>
                            <TabPane tab={<div className="text-xl">{t('showtimes')}</div>} key="1" >
                                <Tabs tabPosition='left'>
                                    {movieDetail.heThongRapChieu?.map((cinema, index) => {
                                        return <TabPane tab={
                                            <div style={{ borderBottom: '1px solid rgb(243, 244, 246' }} className="flex gap-2 text-left items-center font-semibold">
                                                <img className="w-12 h-12 p-2" src={cinema.logo} alt={cinema.tenHeThongRap} onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://source.unsplash.com/100x100/?portrait";
                                                }} />
                                                <div>
                                                    <p className="m-0">{cinema.tenHeThongRap}</p>
                                                </div>
                                            </div>
                                        } key={index}>
                                            {cinema.cumRapChieu?.map((cinemaCluster, index) => {
                                                return <div key={index} className="pb-2" style={{ borderBottom: '1px solid rgb(243, 244, 246' }} >
                                                    <div key={index} className="flex gap-2 text-left items-center">
                                                        <img className="w-16 h-16 p-2" src={cinemaCluster.hinhAnh} alt={cinemaCluster.tenCumRap} onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://source.unsplash.com/100x100/?portrait";
                                                        }} />
                                                        <div>
                                                            <p className="m-0 font-semibold">{cinemaCluster.tenCumRap}</p>
                                                            <p className="m-0 text-gray-400">{cinemaCluster.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-6 gap-2 font-bold text-center px-3">
                                                        {cinemaCluster.lichChieuPhim?.slice(0, 12).map((showCalendar, index) => {
                                                            return <NavLink to={`/checkout/${showCalendar.maLichChieu}`} key={index} className="hover:text-green-600 m-0 border border-green-600 rounded-lg text-green-600 px-1">{moment(showCalendar.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}

                                </Tabs>
                            </TabPane>
                            <TabPane tab={<div className="text-xl">{t('info')}</div>} key="2">
                                <p className="ml-3">Info</p>
                            </TabPane>
                            <TabPane tab={<div className="text-xl">{t('rate')}</div>} key="3">
                                <p className="ml-3">Rate</p>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}
