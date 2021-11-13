import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Dropdown } from 'antd';
import {
    FieldTimeOutlined,
    VideoCameraOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { USER_LOGIN, TOKEN } from "../../utils/settings/config";
import { SweetAlertError, SweetAlertSuccess } from "../../utils/SweetAlert/SweetAlert";
import { useSelector } from "react-redux";
import _ from "lodash";
import { history } from "../../App";
import { NavLink } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => {
    const { Component, ...restParams } = props;
    const { userLogin } = useSelector(state => state.UserReducers);
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!localStorage.getItem(USER_LOGIN) || userLogin.maLoaiNguoiDung !== 'QuanTri') {
        SweetAlertError("You do not have permission to access this page!")
        return <Redirect to="/home" />
    }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <div className="flex items-center justify-end">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="1" />
            <p className="ml-2 mb-0 font-bold text-green-600">
                {userLogin.hoTen}
            </p>
            <Dropdown.Button overlay={
                <Menu >
                    <Menu.Item onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(TOKEN);
                        history.push('/home')
                        SweetAlertSuccess('You are logged out.')
                        window.location.reload();
                    }} key="2" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>} placement="bottomCenter" icon={<DownOutlined />}>
            </Dropdown.Button>
        </div> : ""}
    </Fragment>

    return <Route {...restParams} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo">
                        <NavLink to="/home" className="flex items-center p-2">
                            <img src={require('../../assets/images/logo.svg').default} alt="logo" />
                        </NavLink>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <NavLink to="/admin/movies">Movies</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background text-right" style={{ padding: 0 }}>
                        {operations}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}

export default AdminTemplate;