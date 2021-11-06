import React, { Fragment, memo } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowsSlick.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieAnimateHover from "../Movie/MovieAnimateHover";
import { useDispatch, useSelector } from 'react-redux';
import { setCommingSoonMovieActions, setShowingMovieActions } from "../../redux/actions/MovieActions";
import { getListMovieApiActions } from '../../redux/actions/MovieActions';
import { useTranslation } from 'react-i18next';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}


const MultipleRowsSlick = (props) => {
    const dispatch = useDispatch();
    const { showing, commingSoon } = useSelector(state => state.MovieReducers);
    const { t } = useTranslation();

    const renderMovies = () => {
        return props.arrMovieProps?.splice(0, 12).map((movie, index) => {
            return <div className="mt-2" key={index}  >
                <MovieAnimateHover movie={movie} />
            </div>
        })
    }

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const ACTIVE_SHOWING = showing ? 'active' : 'noneActive';
    const ACTIVE_COMMING_SOON = commingSoon ? 'active' : 'noneActive';

    return (
        <Slider {...settings}>
            {renderMovies()}
        </Slider>
    )
}
export default memo(MultipleRowsSlick);

