import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';
import { SweetAlertError } from '../../../../utils/SweetAlert/SweetAlert';
import { manageCinemaServices } from '../../../../services/ManageCinemaServices';
import { STATUS_CODE } from '../../../../utils/settings/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { createShowtimesApiAction } from '../../../../redux/actions/TicketRoomActions';
import { useDispatch } from 'react-redux';
import { history } from '../../../../App';
import { ArrowLeftOutlined } from '@ant-design/icons';


const Showtimes = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        cinemaSystem: [],
        clusterCinema: [],
    })

    useEffect(async () => {
        try {
            const { data, status } = await manageCinemaServices.getInfoCinemaSystemApi();
            if (status === STATUS_CODE.SUCCESS) {
                setState({
                    ...state,
                    cinemaSystem: data.content,
                })
            }
        } catch (err) {
            SweetAlertError('Get info cinema system error!');
        }
    }, [])

    const renderSelectCinemaSystem = () => {
        return state.cinemaSystem.map((item, index) => {
            return <Select.Option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</Select.Option>
        })
    }

    const renderSelectClusterCinema = () => {
        return state.clusterCinema.map((item, index) => {
            return <Select.Option key={index} value={item.maCumRap}>{item.tenCumRap}</Select.Option>
        })
    }

    const handleChangeSelectCinemaSystem = async (value) => {
        try {
            const { data, status } = await manageCinemaServices.getInfoClusterCinemaFollowSystemApi(value);
            if (status === STATUS_CODE.SUCCESS) {
                setState({
                    ...state,
                    clusterCinema: data.content,
                })
            }
        } catch (err) {
            SweetAlertError('Get info cluster cinema error!');
        }
    }

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 75000
        },
        validationSchema: Yup.object().shape({
            ngayChieuGioChieu: Yup.string().required('Show time, show date are required'),
            maRap: Yup.string().required('Cluster cinema is required'),
            giaVe: Yup.number().required('Price ticket is required'),
        }),
        onSubmit: values => {
            dispatch(createShowtimesApiAction(values))
        }
    })

    const onChange = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    const handleChangeClosure = (name) => {
        return value => formik.setFieldValue(name, value);
    }

    let movies = {};
    if (localStorage.getItem('showtimes')) {
        movies = JSON.parse(localStorage.getItem('showtimes'));
    }

    return (
        <div className="grid grid-cols-4">
            <div>
                <img src={movies.hinhAnh} alt={movies.tenPhim} height={200} width={200} />
            </div>
            <Form
                className="col-span-3 mt-20"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                size="default"
                onSubmitCapture={formik.handleSubmit}
            >
                <h1 className="text-2xl mb-10">Add showtimes - {movies.tenPhim}</h1>
                <Form.Item label="Cinema system">
                    <Select placeholder="Select cinema system" onChange={handleChangeSelectCinemaSystem}>
                        {renderSelectCinemaSystem()}
                    </Select>
                </Form.Item>
                <Form.Item label="Cluster cinema">
                    <Select placeholder="Select cluster cinema" onChange={handleChangeClosure('maRap')}>
                        {renderSelectClusterCinema()}
                    </Select>
                    <span className='text-red-500 font-thin italic'>{formik.touched.maRap && Boolean(formik.errors.maRap) ? formik.errors.maRap : null}</span>
                </Form.Item>
                <Form.Item label="Show time, show date">
                    <DatePicker format="DD/MM/YYYT hh:mm:ss" showTime onChange={onChange} onOk={onOk} /> <br />
                    <span className='text-red-500 font-thin italic'>{formik.touched.ngayChieuGioChieu && Boolean(formik.errors.ngayChieuGioChieu) ? formik.errors.ngayChieuGioChieu : null}</span>
                </Form.Item>
                <Form.Item label="Price ticket">
                    <InputNumber type="number" defaultValue={75000} min={75000} max={180000} step={5000} onChange={handleChangeClosure('giaVe')} /> <br />
                    <span className='text-red-500 font-thin italic'>{formik.touched.giaVe && Boolean(formik.errors.giaVe) ? formik.errors.giaVe : null}</span>
                </Form.Item>
                <Form.Item label="Action">
                    <Button type="primary" htmlType="submit">Create showtimes</Button>
                </Form.Item>
                <div className='text-blue-400 cursor-pointer flex items-center gap-1' onClick={() => {
                    history.goBack()
                }}><ArrowLeftOutlined /> Go back</div>
            </Form>
        </div>
    );
};
export default Showtimes;