import React from 'react';
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Switch} from 'antd';
import { 
    HistoryOutlined, 
    HomeOutlined,
    ShopOutlined,
    LogoutOutlined, 
    ShoppingCartOutlined,
    ReconciliationOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from 'react-router';
import Logout from './Logout'

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;




class NavigationBar extends React.PureComponent{

    constructor(props) {
        super(props)

        this.state = {
            isLogout:false        
        }

        this.handleClick = this.handleClick.bind(this)
    }

    // Handles click of navigation bar menu item
    handleClick = ({ key }) => {
        // TODO: Fix this to handle logout call
        if(key==='/logout')
        {
            axios(
                {
                    method: 'get',           
                    url: 'api/logout',
                }             
            )
            .then(
                (response)=>{
                    console.log(response);
                    sessionStorage.removeItem('user')
                    this.setState({ isLogout: true })
                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )
        }
        else if (key.startsWith('/')) {
            this.props.history.push(key)
        }
    }

    render() {
        if (this.state.isLogout){
            this.setState({isLogout:false})
            
            return <Redirect to = {{ pathname: "/" }} />
        }
        return(

            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu onClick={this.handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.defaultSelected]}>
                <Menu.Item style={{ width: '150px', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontSize: '1.25rem' }}>HOLYSAS</Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key="/">Home</Menu.Item>
                <SubMenu key='sub1' icon={<ShopOutlined/>} title='Products'>
                    <Menu.Item key='1'>Option 1</Menu.Item>
                    <SubMenu key='2' title='Option2'>
                        <Menu.Item key='2.1'>Option 2.1</Menu.Item>
                        <Menu.Item key='2.2'>Option 2.2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key='3'>Option 3</Menu.Item>
                </SubMenu>
                <Menu.Item icon={<HistoryOutlined />} key="/history">Order History</Menu.Item>
                <Menu.Item icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
                <Menu.Item icon={<ReconciliationOutlined />} key="/product">Product Detail</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} key="/logout">Logout</Menu.Item>
                </Menu>
            </Header>


        )
    }
}

export default withRouter(NavigationBar)