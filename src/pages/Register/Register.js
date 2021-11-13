import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { GROUP_CODE } from '../../utils/settings/config';
import { registerAccountApiAction } from '../../redux/actions/UserActions';
import * as Yup from 'yup';
import { ValidationFormUser } from '../../utils/ValidationForm/ValidationFormUser';

export default function Register() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            passwordConfirm: "",
            email: "",
            soDt: "",
            maNhom: GROUP_CODE,
            hoTen: ""
        },
        validationSchema: ValidationFormUser(
            Yup.string().when('matKhau', (matKhau, field) =>
                matKhau ? field.required().oneOf([Yup.ref('matKhau')]) : field
            )
        ),
        onSubmit: values => {
            dispatch(registerAccountApiAction(values))
        },
    });

    return (
        <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="font-sans">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-white ">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                                Register
                            </label>
                            <form onSubmit={formik.handleSubmit} className="mt-10">
                                <div>
                                    <input type="text" onChange={formik.handleChange} name="taiKhoan" placeholder="Username" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.taiKhoan && Boolean(formik.errors.taiKhoan) ? formik.errors.taiKhoan : null}</span>
                                </div>
                                <div className="mt-7">
                                    <input type="password" onChange={formik.handleChange} name="matKhau" placeholder="Password" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.matKhau && Boolean(formik.errors.matKhau) ? formik.errors.matKhau : null}</span>
                                </div>
                                <div className="mt-7">
                                    <input type="password" onChange={formik.handleChange} name="passwordConfirm" placeholder="Password confirm" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm) ? formik.errors.passwordConfirm : null}</span>
                                </div>
                                <div className="mt-7">
                                    <input type="text" onChange={formik.handleChange} name="hoTen" placeholder="Full name" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.hoTen && Boolean(formik.errors.hoTen) ? formik.errors.hoTen : null}</span>
                                </div>
                                <div className="mt-7">
                                    <input type="email" onChange={formik.handleChange} name="email" placeholder="Email" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}</span>
                                </div>
                                <div className="mt-7">
                                    <input type="text" onChange={formik.handleChange} name="soDt" placeholder="Phone number" className="focus:outline-none px-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    <span className='text-red-500 font-thin italic'>{formik.touched.soDt && Boolean(formik.errors.soDt) ? formik.errors.soDt : null}</span>
                                </div>
                                <div className="mt-7">
                                    <button type="submit" className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                        Register
                                    </button>
                                </div>
                                <div className="mt-7">
                                    <div className="flex justify-center items-center">
                                        <label className="mr-2">
                                            Do you have about account?
                                        </label>
                                        <NavLink to="/login" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Login
                                        </NavLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
