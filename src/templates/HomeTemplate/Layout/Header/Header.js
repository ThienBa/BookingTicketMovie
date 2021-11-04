import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black text-white bg-opacity-40 fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/home" className="flex items-center p-2">
                    <img src={require('../../../../assets/images/logo.svg').default} alt="logo" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">Home</NavLink>
                    </li>
                    <li className="flex">
                          <NavLink to="/news" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">News</NavLink>
                    </li>
                    <li className="flex">
                          <NavLink to="/showtimes" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">Showtimes</NavLink>
                    </li>
                    <li className="flex">
                          <NavLink to="/contact" activeClassName="text-green-500 border-green-500  border-b-2" className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white hover:text-green-500">Contact</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <NavLink to="/login" className="text-white hover:text-green-500 self-center px-8 py-3 rounded">Sign in</NavLink>
                    <NavLink to="/register" className="text-white hover:text-green-500 self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Sign up</NavLink>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
