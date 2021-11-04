import React, { memo } from 'react';
import { Tabs } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

function HomeTabPane(props) {
    const renderTabPane = () => {
        return props.arrCinemaSystemProps?.map((cinemaSystem, index) => {
            return <TabPane tab={<img style={{ borderBottom: '1px solid rgb(243, 244, 246' }} className="w-12 h-12 p-2" src={cinemaSystem.logo} alt={cinemaSystem.tenHeThongRap} />} key={index}>
                <Tabs tabPosition="left">
                    {cinemaSystem.lstCumRap?.map((cinemaCluster, index) => {
                        return <TabPane tab={
                            <div style={{ borderBottom: '1px solid rgb(243, 244, 246' }} className="flex gap-2 text-left">
                                <img className="w-12 h-12 p-2" src={cinemaCluster.hinhAnh} alt={cinemaCluster.tenCumRap} onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://source.unsplash.com/100x100/?portrait";
                                }} />
                                <div>
                                    <p className="m-0">{cinemaCluster.tenCumRap}</p>
                                    <p className="m-0">{_.size(cinemaCluster.diaChi) > 30 ? <>{cinemaCluster.diaChi.slice(0, 30)}...</> : cinemaCluster.diaChi}</p>
                                </div>
                            </div>
                        } key={index}>
                            {cinemaCluster.danhSachPhim?.slice(0, 6).map((movie, index) => {
                                return <div key={index} style={{ borderBottom: '1px solid rgb(243, 244, 246' }} className="flex gap-2 text-left items-center">
                                    <img className="w-20 h-20 p-2" src={movie.hinhAnh} alt={movie.tenPhim} onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://source.unsplash.com/100x100/?portrait";
                                    }} />
                                    <div className="mb-3">
                                        <h3>{movie.tenPhim}</h3>
                                        <div className="grid grid-cols-8 gap-2 font-bold">
                                            {movie.lstLichChieuTheoPhim?.slice(0, 12).map((showCalendar, index) => {
                                                return <NavLink to="/" key={index} className="hover:text-green-600 m-0 border border-green-600 rounded-lg text-green-600 px-1">{moment(showCalendar.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }
    return (
        <div className="my-20">
            <Tabs tabPosition="left" className="border border-gray-200">
                {renderTabPane()}
            </Tabs>
        </div>
    )
}

export default memo(HomeTabPane);
