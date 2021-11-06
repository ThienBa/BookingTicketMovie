import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { arrCinemaSystem } = useSelector(state => state.CinemaSystemReducers);
    const arrPartner = _.map(arrCinemaSystem, theaterSystem => _.pick(theaterSystem, ['logo', 'tenHeThongRap']))
    const { t } = useTranslation();

    const renderPartner = () => {
        return arrPartner.map((partner, index) => {
            return <NavLink to="/" key={index}>
                <img className="rounded-full" src={partner.logo} alt={partner.tenHeThongRap} />
            </NavLink>
        })
    }

    return (
        <div style={{ background: "#222" }}>
            <div>
                <div className="text-gray-800 flex flex-wrap justify-center ">
                    <div className="p-5 flex items-center">
                        <NavLink to="/home" className="flex items-center p-2">
                            <img src={require('../../../../assets/images/logo.svg').default} alt="logo" />
                        </NavLink>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium mb-7"></div>
                        <a className="text-gray-200 my-3 block" href="/#">{t('termsOfUse')}<span className="text-teal-600 text-xs p-1" /></a>
                        <a className="text-gray-200 my-3 block" href="/#">{t('privacyPolicy')}<span className="text-teal-600 text-xs p-1" /></a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium">{t('partner')}</div>
                        <div className="grid grid-cols-3 gap-5 mt-3">
                            {renderPartner()}
                        </div>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium">{t('mobileApp')}</div>
                        <div className="flex gap-3">
                            <a className="text-gray-200 my-3 block" href="/#">
                                <img width={30}
                                    src="https://tix.vn/app/assets/img/icons/apple-logo.png" alt="logoappstore" />
                            </a>
                            <a className="text-gray-200 my-3 block" href="/#">
                                <img width={30} src="https://tix.vn/app/assets/img/icons/android-logo.png" alt="loachplay" />
                            </a>
                        </div>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-white font-medium">{t('social')}</div>
                        <div className="flex gap-3">
                            <a className="text-gray-200 my-3 block" href="/#">
                                <img width={30}
                                    src="https://tix.vn/app/assets/img/icons/facebook-logo.png" alt="facebook" />
                            </a>
                            <a className="text-gray-200 my-3 block" href="/#">
                                <img width={30} src="https://tix.vn/app/assets/img/icons/zalo-logo.png" alt="zalo" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col md:flex-row max-w-6xl">
                    <div className="mt-2 text-white">© {t('copyright')} 2020. {t('allRightsReserved')}.</div>
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                        <a href="/#" className="w-6 mx-1">

                        </a>
                        <a href="/#" className="w-6 mx-1">

                        </a>
                        <a href="/#" className="w-6 mx-1">

                        </a>
                        <a href="/#" className="w-6 mx-1">

                        </a>
                        <a href="/#" className="w-6 mx-1">

                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
