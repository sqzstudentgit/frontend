import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import pencil from '../assets/pencil.jpg';
import pen from '../assets/pen.jpg';
import { 
    HomeOutlined,
    ShopOutlined
} from '@ant-design/icons';
// import axios from 'axios';
// import Get from 'axios';
// import ImageViewer from "../components/ImageViewer";

// import ProductList from '../components/ProductList'
// Ant Design Sub-Components
// Ant Design Components
import {
    List,
    Card,
    Image,
    Layout,
    Menu,
    Breadcrumb,
    Pagination
  } from 'antd';
const { Meta } = Card;

const { Header, Content, Footer, Sider } = Layout;
  
  // Ant Design Icons
import NavigationBar from "../components/NavigationBar";
  
  // Application components
// import HistoryProduct from '../components/HistoryProduct';
// import { useStoreActions } from 'easy-peasy';


class ProductListPage extends React.Component{
    state = {
        products: [
            {
                id: "3",
                barcode: "9326243001200",
                description1: "Tarpaulin 150cm x 210cm (5' x 7')",
                height: 40.0,
                catagory: "Arts-and-craft",
                price:"3.01",
                name: "Tarpaulin 150cm x 210cm (5' x 7')",
                prodductCode: "01200",
                width: 40.0,
                productSearchCode: "Tarpaulin-150cm-x-210cm-(5'-x-7')-21479231981488",
                image_s: pencil,
                image_m: "https://attachments.pjsas.com.au/products/images_medium/49855.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/38595.jpg"
            },
            {
                id: "2",
                barcode: "9326243001194",
                description1: "Tarpaulin 120cm x 180cm (4' x 6')",
                height: 48.0,
                catagory: "Arts-and-craft",
                price: "99.99",
                name: "Tarpaulin 120cm x 180cm (4' x 6')",
                prodductCode: "01194",
                width: 48.0,
                productSearchCode: "Tarpaulin-120cm-x-180cm-(4'-x-6')-21479231981342",
                image_s: pen,
                image_m: "https://attachments.pjsas.com.au/products/images_medium/49852.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/49852.jpg"
            },
            {
                id: "14",
                barcode: "9326243100088",
                description1: "Living World Snakes",
                description2: "09-12-2020",
                height: 24.0,
                catagory: "Bathroom",
                price: "99.99",
                name: "Living World Snakes",
                prodductCode: "100088",
                width: 72.0,
                productSearchCode: "Living-World-Snakes-21479231991574",
                image_s: "https://attachments.pjsas.com.au/products/images_small/21969.jpg",
                image_m: "https://attachments.pjsas.com.au/products/images_medium/21969.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/21969.jpg"
            },
            {
                id: "22",
                barcode: "9326243101177",
                description1: "B-Tape Gun",
                description2: "13-11-2020",
                height: 12.0,
                catagory: "Bathroom",
                price: "1.31",
                name: "B-Tape Gun",
                prodductCode: "101177",
                width: 12.0,
                productSearchCode: "Living-World-Snakes-21479231991574",
                image_s: "https://attachments.pjsas.com.au/products/images_small/38610.jpg",
                image_m: "https://attachments.pjsas.com.au/products/images_medium/38610.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/38610.jpg"
            },
            {
                id: "10",
                barcode: "9326243002788",
                description1: "Bungee Cord 61cm 2pc",
                description2: "11-11-2020",
                height: 12.0,
                catagory: "Bathroom",
                price: "99.99",
                name: "Bungee Cord 61cm 2pc",
                prodductCode: "02788",
                width: 72.0,
                productSearchCode: "Bungee-Cord-61cm-2pc-21479231985710",
                image_s: "https://attachments.pjsas.com.au/products/images_small/84874.jpg",
                image_m: "https://attachments.pjsas.com.au/products/images_medium/84874.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/84874.jpg"
            },
            {
                id: "18",
                barcode: "9326243100903",
                description1: "Disposable Tableware Plate Dinner 230mm 15pk",
                description2: "11-11-2020",
                height: 24.0,
                catagory: "Kitchen",
                price: "2.14",
                name: "Dinner plate",
                prodductCode: "100903",
                width: 24.0,
                productSearchCode: "Bungee-Cord-61cm-2pc-21479231985710",
                image_s: "https://attachments.pjsas.com.au/products/images_small/38595.jpg",
                image_m: "https://attachments.pjsas.com.au/products/images_medium/38595.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/38595.jpg"
            },
            {
                id: "20",
                barcode: "9326243100934",
                description1: "Disposable Tableware Plate Oval 230mm x 300mm 10pk",
                description2: "11-11-2020",
                height: 24.0,
                caatagory: "Kitchen",
                price: "1.45",
                name: "Oval plate",
                prodductCode: "100934",
                width: 24.0,
                productSearchCode: "Bungee-Cord-61cm-2pc-21479231985710",
                image_s: "https://attachments.pjsas.com.au/products/images_small/84691.jpg",
                image_m: "https://attachments.pjsas.com.au/products/images_medium/84691.jpg",
                image_l: "https://attachments.pjsas.com.au/products/images_large/84691.jpg"
            }
        ]
    }

    render() {
        return (
            <Layout>
               <NavigationBar  history={history} defaultSelected='/productList'/>
               <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                            <span>Home</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <ShopOutlined />
                            <span>Products</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <List
                        // grid={{ gutter:16, column:4 }}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                          }}
                        dataSource={this.state.products}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    key={item.name}
                        
                                    cover={<Image alt="example" src={item.image_s} />}>
                                    <Meta key={item.barcode} title={item.name} description={item.price} />
                             
                                </Card>
                            </List.Item>
                        )}
                    
                    />
                </Content>
                <Pagination
                    total={7}
                    showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    // defaultCurrent={3}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={20}
                    defaultCurrent={1}
                />
                <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
            </Layout>
        )
      }
}
  

export default withRouter(ProductListPage);
