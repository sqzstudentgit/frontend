import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

// Ant Design Components
import { Menu } from 'antd';
import { Redirect } from 'react-router';
const { SubMenu } = Menu;
// const { Sider } = Layout;
// Ant Design Icons
import { ShopOutlined } from '@ant-design/icons';

class CategoryTree extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
        category: [],  
    }

  }

    componentDidMount() {
      axios({
              method: 'get',           
              url: '/api/categories',
              headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
          }              
      )
          .then(
              (response)=>{
                  console.log("Get category info!");
                  // console.log(response);
                  console.log(response.data)
                  this.setState({
                      category: response.data,
                  });
                  console.log("print this.state.category")
                  console.log(this.state.length)
              }
          )
          .catch(function (error) {
              console.log(error);
          })
    }

    // return the menu of parent categories
    renderSubMenu = ({id, name, Children}) => {
      return (
        <SubMenu key={id} title= {name}>
          {
            Children && Children.map(item => {
              return item.Children && item.Children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
          }
        </SubMenu>
      )
    }

    // return the menu of children categories
    renderMenuItem = ({id, name}) => {
      var path = {
        pathname: '/products/category',
      }
      return (
        <Menu.Item key={id}>
          <Link to={path}>
            <span>{name}</span>
          </Link>
        </Menu.Item>
      )
    }

    onOpenChange = (openKeys) => {
      console.log('Following is openkey length')
      console.log(openKeys)
      // duplicate click the same menu list
      if(openKeys.length === 1 || openKeys.length === 0){
        this.setState({
          openKeys
        })
        return
      }
      // New operation to open another menu list
      const latestOpenKey = openKeys[openKeys.length - 1]
      // if click the same one
      if(latestOpenKey.includes(openKeys[0])){
        this.setState({
          openKeys
        })
      }else{
        this.setState({
          openKeys: [latestOpenKey]
        })
      }
    }

    render() {
      const {openKeys} = this.state
      return( 
        <Menu 
        onOpenChange={this.onOpenChange.bind(this)} //click on one parent category to show its children
        mode="vertical"
        style={{ width: 256 }}
        theme="dark"
        openKeys={openKeys}
        >
          { // whether there are children under one parent category or not
            this.state.category && this.state.category.map(item => {
              return item.Children && item.Children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
          }
        </Menu>
      )
    }
}


export default CategoryTree
