import React, { useEffect, useMemo } from 'react'
import HomeTabPane from './HomeTabPane/HomeTabPane'
import { useSelector } from 'react-redux'
import MultipleRowsSlick from '../../components/ReactSlick/MultipleRowsSlick';
import { useDispatch } from 'react-redux';
import { getListMovieApiActions } from '../../redux/actions/MovieActions';
import { getCinemaSystemApiActions } from '../../redux/actions/CinemaSystemActions';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';

export default function Home() {
    const { arrMovie } = useSelector(state => state.MovieReducers);
    const { arrCinemaSystem } = useSelector(state => state.CinemaSystemReducers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListMovieApiActions())
        dispatch(getCinemaSystemApiActions())
    }, [])

    const arrMovieProps = useMemo(() => arrMovie, [arrMovie]);
    const arrCinemaSystemProps = useMemo(() => arrCinemaSystem, [arrCinemaSystem]);

    return (
        <>
            <HomeCarousel />
            <div className="container">
                <div className="my-10">
                    <MultipleRowsSlick arrMovieProps={arrMovieProps} />
                </div>
                <div>
                    <HomeTabPane arrCinemaSystemProps={arrCinemaSystemProps} />
                </div>
            </div>
        </>
    )
}
