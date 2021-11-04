import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getListCarouselApiActions } from '../../redux/actions/CarouselActions';
import "./HomeCarousel.css";

const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
};

export default function HomeCarousel() {
    const { arrCarousel } = useSelector(state => state.CarouselReducers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListCarouselApiActions());
    }, [])

    const renderCarousel = () => {
        return arrCarousel.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img className="w-full opacity-0" src={item.hinhAnh} alt={item.hinhAnh} />
                </div>
            </div>
        })
    }
    return (
        <div>
            <Carousel effect="fade" autoplay>
                {renderCarousel()}
            </Carousel>
        </div>
    )
}
