import * as Yup from 'yup';

export const ValidationFormUser = (passwordConfirm = '') => {
    return Yup.object().shape({
        taiKhoan: Yup.string()
            .min(6, 'Username no less than 6 characters!')
            .max(32, 'Username no larger than 32 characters!')
            .required('Username is required'),
        matKhau: Yup.string()
            .min(6, 'Password no less than 6 characters!')
            .max(32, 'Password no larger than 32 characters!')
            .matches(/(?=.*?[A-Za-z])(?=.*?[0-9])/, 'Password must include uppercase letters, lowercase letters, numbers and special characters')
            .required('Password is required'),
        passwordConfirm,
        email: Yup.string()
            .email('Email is not valid!')
            .required('Email is required'),
        soDt: Yup.string()
            .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})$/, 'Phone number is not in correct format')
            .required('Email is required'),
        hoTen: Yup.string()
            .required('Full name is required'),
    })
}