import React from 'react';
import './MovieAnimateHover.css';
import { PlayCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function MovieAnimateHover(props) {
    const { hinhAnh, tenPhim, maPhim,biDanh } = props.movie;

    return (
        <>
            <div className="flip-card mt-2">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} onError={e => {
                            e.target.onerror = null;
                            e.target.src = 'https://picsum.photos/300/300';
                        }} />
                    </div>
                    <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0 }} >
                            <img src={hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                        </div>
                        <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                                <div className="text-2xl mt-2 font-bold">{tenPhim}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <NavLink to={`/detail/${maPhim}-${biDanh}`} className="hover:text-white bg-orange-300 text-center cursor-pointer py-2 bg-green-300 rounded-sm my-2 text-success-50 font-bold text-white w-72">BUY TICKET</NavLink>
            </div>
        </>
    )
}
