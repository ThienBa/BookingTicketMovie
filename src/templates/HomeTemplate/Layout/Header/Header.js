import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { SweetAlertSuccess } from '../../../../utils/SweetAlert/SweetAlert';
import { history } from '../../../../App';
import { TOKEN, USER_LOGIN } from '../../../../utils/settings/config';



const { Option } = Select;

export default function Header() {
    const { t, i18n } = useTranslation();
    const { userLogin } = useSelector(state => state.UserReducers);
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    useEffect(() => {
        renderSignInUp()
    }, [])

    const renderSignInUp = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <NavLink to="/login" className="text-white hover:text-green-500 self-center px-8 py-3 rounded">{t('signin')}</NavLink>
                <NavLink to="/register" className="text-white hover:text-green-500 self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">{t('signup')}</NavLink>
            </Fragment>
        }

        return <div className="flex items-center border-r">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="1" />
            <NavLink to="/profile" className="ml-2 mb-0 font-bold text-white">
                {userLogin.hoTen}
            </NavLink>
            <button onClick={async () => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home')
                SweetAlertSuccess("You are logout");
                window.location.reload();
            }} className="mx-2 mb-0 text-green-400 font-thin">{t('logout')}</button>
        </div>
    }

    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black text-white bg-opacity-40 fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/home" className="flex items-center p-2">
                    <img src={require('../../../../assets/images/logo.svg').default} alt="logo" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">{t('home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">{t('news')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/showtimes" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">{t('showtimes')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">{t('contact')}</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderSignInUp()}
                    <Select defaultValue={<img className="w-10 h-10" src={require('../../../../assets/images/united-kingdom.png').default} alt="english" />} bordered={false} style={{ width: 80, color: 'white', backgroundColor: 'transparent' }} removeIcon={""} onChange={handleChange}>
                        <Option value="english">
                            <img className="w-10 h-10" src={require('../../../../assets/images/united-kingdom.png').default} alt="english" />
                        </Option>
                        <Option value="japan">
                            <img className="w-10 h-10" src={require('../../../../assets/images/japan.png').default} alt="japan" />
                        </Option>
                        <Option value="vietnamese">
                            <img className="w-10 h-10" src={require('../../../../assets/images/VN.png').default} alt="vietnamese" />
                        </Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div >
        </header >

    )
}
