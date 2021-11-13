import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovieApiAction, getListMovieApiActions } from '../../../redux/actions/MovieActions';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { history } from '../../../App';
const { Search } = Input;

export default function Movies() {
    const { arrrMovieDefault } = useSelector(state => state.MovieReducers)
    const dispatch = useDispatch();

    const [state, setState] = useState({
        sortedInfo: null,
    })

    useEffect(() => {
        dispatch(getListMovieApiActions())
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const onSearch = value => {
        dispatch(getListMovieApiActions(value));
    };

    let { sortedInfo } = state;
    sortedInfo = sortedInfo || {};
    const columns = [
        {
            title: 'Number',
            key: 'number',
            render: (text, movies, index) => {
                return <Fragment key={index}>{index + 1}</Fragment>
            },
            width: "7%"
        },
        {
            title: 'Movie code',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortedInfo.columnKey === 'maPhim' && sortedInfo.order,
            ellipsis: true,
            width: "10%"
        },
        {
            title: 'Name movie',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            sorter: (a, b) => {
                if (a.tenPhim.toLowerCase().trim() > b.tenPhim.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortOrder: sortedInfo.columnKey === 'tenPhim' && sortedInfo.order,
            ellipsis: true,
            width: "15%"
        },
        {
            title: 'Images',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text, movies) => {
                return <img src={text} alt={movies.tenPhim} className="w-10" onError={(e) => { e.target.onError = null; e.target.src = "https://source.unsplash.com/100x100/?portrait" }} />
            },
            width: '7%',
        },
        {
            title: 'Description',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text) => {
                return _.size(text) > 100 ? text.substring(0, 100) + '...' : text;
            },
            width: '34%',
        },
        {
            title: 'Showtimes',
            dataIndex: 'ngayKhoiChieu',
            key: 'ngayKhoiChieu',
            render: (text) => {
                return moment(text).format('DD/MM/YYYY hh:mm A')
            },
            width: '15%'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, movies) => {
                return <Fragment>
                    <NavLink to={`/admin/movies/edit/${movies.maPhim}-${movies.biDanh}`}><EditOutlined style={{ fontSize: 25 }} /></NavLink>
                    <span className="cursor-pointer mx-2" onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${movies.tenPhim}" movie`)) {
                            dispatch(deleteMovieApiAction(movies.maPhim));
                        }
                    }}><DeleteOutlined style={{ fontSize: 25, color: 'red' }} /></span>
                    <NavLink to={`/admin/movies/showtimes/${movies.maPhim}-${movies.biDanh}`} onClick={()=>{
                        localStorage.setItem('showtimes', JSON.stringify(movies));
                    }}><CalendarOutlined style={{ fontSize: 25 }} /></NavLink>
                </Fragment>
            },
        },
    ];
    return (
        <>
            <h1 className="text-2xl">Movie management</h1>
            <Button onClick={() => { history.push('/admin/movies/addnewmovie') }}>Add movie</Button>
            <Search className="my-5" placeholder="input search text" onSearch={onSearch} />
            <Table columns={columns} rowKey={"maPhim"} dataSource={arrrMovieDefault} onChange={handleChange} />
        </>
    );
}
