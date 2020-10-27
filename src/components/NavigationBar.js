import React from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Row } from 'antd';
import { 
  HistoryOutlined, 
  HomeOutlined,
  ShopOutlined,
  LogoutOutlined, 
  ShoppingCartOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

import axios from 'axios';
import { Redirect } from 'react-router';
import CategoryTree from './CategoryTree'

const { Header } = Layout;
const { SubMenu } = Menu;




class NavigationBar extends React.PureComponent{

  constructor(props) {
    super(props)

    this.state = {
      isLogout:false,     
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
          <Menu.Item style={{ float: 'left', width: 150, textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontSize: '1.25rem' }}>HOLYSAS</Menu.Item>
          <Menu.Item style={{ float: 'left' }} icon={<HomeOutlined />} key="/">Home</Menu.Item>
          <SubMenu style={{ float: 'left' }} icon={<ShopOutlined/>} key="/productList" title="Products">
            <Menu.Item key="/productList">All products</Menu.Item>
            <CategoryTree />
          </SubMenu>
          <Menu.Item style={{ float: 'left' }} icon={<HistoryOutlined />} key="/history">Order History</Menu.Item>
          <Menu.Item style={{ float: 'left' }} icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
          <Menu.Item style={{ float: 'right' }} icon={<LogoutOutlined />} key="/logout">Logout</Menu.Item>
          <Menu.Item style={{ float: 'right' }} icon={<UserSwitchOutlined/>} key="/choose">Switch account</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default withRouter(NavigationBar)