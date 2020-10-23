import React, { useState, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import imageComing from '../assets/imageComing.png';
import { 
    HomeOutlined,
    ShopOutlined
} from '@ant-design/icons';

// Ant Design Sub-Components
// Ant Design Components
import {
    List,
    Card,
    Image,
    Layout,
    Breadcrumb,
    Pagination
  } from 'antd';
const { Meta } = Card;

const { Header, Content, Footer, Sider } = Layout;
  
  // Ant Design Icons
import NavigationBar from "../components/NavigationBar";
  
  // Application components
// import ProductList from '../components/ProductList';
// import { useStoreActions } from 'easy-peasy';


class CategoryPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalPage: '',
            totalItem: '',
            pageCurrent: 1,
            pageItems: '',
            pred_page: 1,
            image: imageComing,
        }
    }

    componentDidMount() {
            axios({
                    method: 'get',           
                    url: '/api/products',
                    headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
                    params: {
                        page: this.state.pageCurrent,
                        category: '2079'
                    }
                }              
            )
                .then(
                    (response)=>{
                        console.log("Get products info!");
                        console.log(response.data);
                        // console.log(response.data.items)
                        this.setState({
                            products: response.data.items,
                            totalPage: response.data.total_pages,
                            totalItem: response.data.total_items,
                            pageItems: response.data.page_items
                        });
                        
                    }
                )
                .catch(function (error) {
                    console.log(error);
                })
           // this.state.pre_page: this.state.pageCurrent;
        
    }

    onPageNumChange(pageCurrent){
        console.log(pageCurrent)
        this.setState({
            pageCurrent: pageCurrent,
        })
    }

    componentDidUpdate() {
        if(this.state.pageCurrent !== this.state.pred_page){
            axios({
                    method: 'get',           
                    url: '/api/products',
                    headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
                    params: {
                        page: this.state.pageCurrent,
                        category: '2079'
                    }
                }              
            )
                .then(
                    (response)=>{
                        console.log("Update products info!");
                        console.log(response.data);
                        console.log(response.data.items)
                        this.setState({
                            products: response.data.items,
                            totalPage: response.data.total_pages,
                            totalItem: response.data.total_items,
                            pageCurrent: response.data.page_num,
                            pageItems: response.data.page_items,
                            pred_page: response.data.page_num
                        });
                        
                    }
                )
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <Layout>
                <NavigationBar  history={history} defaultSelected='/productList'/>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                            <span>Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/productList">
                            <ShopOutlined />
                            <span>Products</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/category">
                            <ShopOutlined />
                            <span>Categories</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <List
                        // grid={{ gutter:16, column:4 }}
                        grid={{
                            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                          }}
                        dataSource={this.state.products}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    key={item.name}
                                    cover={<Image alt="example" src={this.state.image} />}>
                                    <Link to='/productDetail'>
                                    <Meta key={item.barcode} title={item.productCode} description={item.name} />
                                    </Link>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Pagination //add active url for each productlist page
                        total={this.state.totalItem}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize = {20}
                        current={this.state.pageCurrent}
                        
                            onChange = {(pageCurrent) => this.onPageNumChange(pageCurrent)}
                        
                    />

                    <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>

                </Content>
            </Layout>
        )
    }
}
  

export default withRouter(CategoryPage);