import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { deleteUserApiAction, getListUserApiAction } from '../../../redux/actions/UserActions';
import { setUserEditAction } from '../../../redux/actions/UserActions';
const { Search } = Input;

export default function Users() {
    const { arrListUser } = useSelector(state => state.UserReducers)
    const dispatch = useDispatch();

    const [state, setState] = useState({
        sortedInfo: null,
    })

    useEffect(() => {
        dispatch(getListUserApiAction())
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const onSearch = value => {
        dispatch(getListUserApiAction(value))
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
            title: 'Username',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            sorter: (a, b) => {
                if (a.taiKhoan.toLowerCase().trim() > b.taiKhoan.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortedInfo.columnKey === 'taiKhoan' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => {
                if (a.email.toLowerCase().trim() > b.email.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Full name',
            dataIndex: 'hoTen',
            key: 'hoTen',
            sorter: (a, b) => {
                if (a.hoTen.toLowerCase().trim() > b.hoTen.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortOrder: sortedInfo.columnKey === 'hoTen' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Phone number',
            dataIndex: 'soDt',
            key: 'soDt',
        },
        {
            title: 'User type',
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
            filters: [
                {
                    text: 'Administrator',
                    value: 'QuanTri',
                },
                {
                    text: 'Customer',
                    value: 'KhachHang',
                },
            ],
            onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, users) => {
                return <Fragment>
                    <NavLink to={`/admin/users/edit/${users.taiKhoan}`} onClick={() => {
                        dispatch(setUserEditAction(users))
                    }}><EditOutlined style={{ fontSize: 25 }} /></NavLink>
                    <span className="cursor-pointer mx-2" onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${users.taiKhoan}" user`)) {
                            dispatch(deleteUserApiAction(users.taiKhoan))
                        }
                    }}><DeleteOutlined style={{ fontSize: 25, color: 'red' }} /></span>
                </Fragment>
            },
        },
    ];
    return (
        <>
            <h1 className="text-2xl">User management</h1>
            <Button onClick={() => { history.push('/admin/users/addnewuser') }}>Add user</Button>
            <Search className="my-5" placeholder="input search text" onSearch={onSearch} />
            <Table columns={columns} rowKey={"taiKhoan"} dataSource={arrListUser} onChange={handleChange} />
        </>
    );
}
