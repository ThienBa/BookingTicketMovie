import React, { Fragment, useState } from 'react';
import {
    Form,
    Input,
    Radio,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { GROUP_CODE } from '../../../../utils/settings/config';
import { useDispatch } from 'react-redux';
import { addMovieUploadImageApiAction } from '../../../../redux/actions/MovieActions';
import { history } from '../../../../App';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const AddNewMovie = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imageSrc, setImageSrc] = useState(null);
    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const notificationValidationStringRequired = (notificationString, notificationRequired) => {
        return yup.string(`Enter your ${notificationString}`).required(`${notificationRequired} is required`)
    }

    const validationSchema = yup.object().shape({
        tenPhim: notificationValidationStringRequired('name movie', 'Name movie'),
        trailer: notificationValidationStringRequired('trailer', 'Trailer'),
        moTa: notificationValidationStringRequired('description', 'Description'),
        ngayKhoiChieu: notificationValidationStringRequired('show date', 'Show date'),
        sapChieu: false,
        dangChieu: false,
        hot: false,
        danhGia: yup.number(),
        hinhAnh: notificationValidationStringRequired('image', 'Image'),
    });

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        validationSchema,
        onSubmit: values => {
            values.maNhom = GROUP_CODE;
            const formData = new FormData();
            for (const key in values) {
                //Append data into formData and send to server with format formData
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    //Send to server object (size,type,...) of images and name images
                    formData.append('hinhAnh', values[key], values[key].name);
                }
            }
            dispatch(addMovieUploadImageApiAction(formData))
        }
    })

    const handleChangeClosure = (name) => {
        return value => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeDatePicker = value => {
        formik.setFieldValue('ngayKhoiChieu', moment(value).format("DD/MM/YYYY"));
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImageSrc(e.target.result)
            }
            formik.setFieldValue('hinhAnh', file);
        }

    }

    return (
        <>
            <h1 className="text-2xl">Add new movie</h1>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Name movie">
                    <Input name="tenPhim"
                        onChange={formik.handleChange} />
                    <span className='text-red-500 font-thin italic'>{formik.touched.tenPhim && Boolean(formik.errors.tenPhim) ? formik.errors.tenPhim : null}</span>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                    <span className='text-red-500 font-thin italic'>{formik.touched.trailer && Boolean(formik.errors.trailer) ? formik.errors.trailer : null}</span>
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea rows={4} name="moTa" onChange={formik.handleChange} />
                    <span className='text-red-500 font-thin italic'>{formik.touched.moTa && Boolean(formik.errors.moTa) ? formik.errors.moTa : null}</span>
                </Form.Item>
                <Form.Item label="Show date">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} />  <br />
                    <span className='text-red-500 font-thin italic'>{formik.touched.ngayKhoiChieu && Boolean(formik.errors.ngayKhoiChieu) ? formik.errors.ngayKhoiChieu : null}</span>
                </Form.Item>
                <Form.Item label="Showing" valuePropName="checked">
                    <Switch onChange={handleChangeClosure('dangChieu')} />
                </Form.Item>
                <Form.Item label="Comming soon" valuePropName="checked">
                    <Switch onChange={handleChangeClosure('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeClosure('hot')} />
                </Form.Item>
                <Form.Item label="Rate">
                    <InputNumber min="1" max="10" onChange={handleChangeClosure('danhGia')} />
                    <span className='text-red-500 font-thin italic'>{formik.touched.danhGia && Boolean(formik.errors.danhGia) ? formik.errors.danhGia : null}</span>
                </Form.Item>
                <Form.Item label="Image">
                    <input type="file" name="hinhAnh" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={handleChangeFile} />
                    {imageSrc ? <Fragment>
                        <br />
                        <img width="200" height="200" src={imageSrc} alt={imageSrc} />
                    </Fragment> : ''}
                    <span className='text-red-500 font-thin italic'>{formik.touched.hinhAnh && Boolean(formik.errors.hinhAnh) ? formik.errors.hinhAnh : null}</span>
                </Form.Item>
                <Form.Item label="Action">
                    <button type="submit" className="hover:bg-green-500 hover:border-green-500 hover:text-white transition duration-300  border border-green-700 text-green-700 px-3 py-1 rounded-lg font-bold">Add movie</button>
                </Form.Item>
                <div className='text-blue-400 cursor-pointer flex items-center gap-1' onClick={() => {
                    history.goBack()
                }}><ArrowLeftOutlined /> Go back</div>
            </Form>
        </>
    );
};
export default AddNewMovie;