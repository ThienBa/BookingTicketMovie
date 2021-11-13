import React, { useEffect, useMemo } from 'react'
import HomeTabPane from './HomeTabPane/HomeTabPane'
import { useSelector } from 'react-redux'
import MultipleRowsSlick from '../../components/ReactSlick/MultipleRowsSlick';
import { useDispatch } from 'react-redux';
import { getListMovieApiActions } from '../../redux/actions/MovieActions';
import { getCinemaSystemApiActions } from '../../redux/actions/CinemaSystemActions';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


export default function Home() {
    const { arrMovieShowing, arrMovieCommingSoon } = useSelector(state => state.MovieReducers);
    const { arrCinemaSystem } = useSelector(state => state.CinemaSystemReducers);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getListMovieApiActions())
        dispatch(getCinemaSystemApiActions())
    }, [])
    
    return (
        <>
            <HomeCarousel />
            <div className="container">
                <div className="my-10">
                    <Tabs style={{ overflow: 'initial' }} defaultActiveKey="1">
                        <TabPane tab={<h1 className="font-bold m-0 text-green-600">{t('showing')}</h1>} key="1">
                            <MultipleRowsSlick arrMovieProps={arrMovieShowing} />
                        </TabPane>
                        <TabPane tab={<h1 className="font-bold m-0 text-green-600">{t('commingSoon')}</h1>} key="2">
                            <MultipleRowsSlick arrMovieProps={arrMovieCommingSoon} />
                        </TabPane>
                    </Tabs>
                </div>
                <div>
                    <HomeTabPane arrCinemaSystemProps={arrCinemaSystem} />
                </div>
            </div>
        </>
    )
}
