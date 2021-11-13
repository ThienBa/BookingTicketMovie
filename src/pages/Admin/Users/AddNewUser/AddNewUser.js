import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { ValidationFormUser } from '../../../../utils/ValidationForm/ValidationFormUser';
import { GROUP_CODE } from '../../../../utils/settings/config';
import { history } from '../../../../App';
import { addUserApiAction, getListTypeUserApiAction } from '../../../../redux/actions/UserActions';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const AddNewUser = () => {
    const dispatch = useDispatch();
    const { arrListTypeUser } = useSelector(state => state.UserReducers);

    useEffect(() => {
        dispatch(getListTypeUserApiAction())
    }, [])

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: GROUP_CODE,
            hoTen: "",
            maLoaiNguoiDung: "",
        },
        validationSchema: ValidationFormUser(),
        onSubmit: values => {
            dispatch(addUserApiAction(values))
        }
    })

    const renderTypeUser = () => {
        return arrListTypeUser.map((typeUser, index) => {
            return <Fragment key={index}>
                <option value={typeUser.maLoaiNguoiDung}>{typeUser.tenLoai}</option>
            </Fragment>
        })
    }

    return (
        <>
            <h1 className="text-2xl">Add new user</h1>
            <form onSubmit={formik.handleSubmit} className="flex bg-gray-200 items-center justify-center">
                <div className="grid bg-white rounded-lg shadow-xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Username</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="Username" name="taiKhoan" onChange={formik.handleChange} />
                            <span className='text-red-500 font-thin italic'>{formik.touched.taiKhoan && Boolean(formik.errors.taiKhoan) ? formik.errors.taiKhoan : null}</span>
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="email" placeholder="Email" name="email" onChange={formik.handleChange} />
                            <span className='text-red-500 font-thin italic'>{formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Password</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="password" placeholder="Password" name="matKhau" onChange={formik.handleChange} />
                            <span className='text-red-500 font-thin italic'>{formik.touched.matKhau && Boolean(formik.errors.matKhau) ? formik.errors.matKhau : null}</span>
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Phone number</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="Phone number" name="soDt" onChange={formik.handleChange} />
                            <span className='text-red-500 font-thin italic'>{formik.touched.soDt && Boolean(formik.errors.soDt) ? formik.errors.soDt : null}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Fullname</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="Full name"
                                name="hoTen" onChange={formik.handleChange} />
                            <span className='text-red-500 font-thin italic'>{formik.touched.hoTen && Boolean(formik.errors.hoTen) ? formik.errors.hoTen : null}</span>
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">User type</label>
                            <select className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="maLoaiNguoiDung" onChange={formik.handleChange}>
                                {renderTypeUser()}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
                        <button type="button" className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2" onClick={() => {
                            history.goBack()
                        }}>Cancel</button>
                        <button type="submit" className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">Create</button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddNewUser;