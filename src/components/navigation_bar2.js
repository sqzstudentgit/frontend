import React from 'react';
import {withRouter} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { 
    HistoryOutlined, 
    HomeOutlined,
    LogoutOutlined, 
    ShoppingCartOutlined,
    ReconciliationOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


// Handles click of navigation bar menu item
const handleClick = ({ key }) => {
    // TODO: Fix this to handle logout call
    if (key.startsWith('/')) {
        history.push(key)
    }
}

class NavigationBar extends React.PureComponent{

    render() {
        return(

            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['/order']}>
                <Menu.Item style={{ width: '150px', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontSize: '1.25rem' }}>HOLYSAS</Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key="/">Home</Menu.Item>
                <Menu.Item icon={<HistoryOutlined />} key="/viewHistoryOrder">Order History</Menu.Item>
                <Menu.Item icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
                <Menu.Item icon={<ReconciliationOutlined />} key="/product">Product Detail</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
                </Menu>
            </Header>


        )
    }
}

export default withRouter(NavigationBar)