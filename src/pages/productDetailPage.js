import React, { useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"
import axios from 'axios';

import ImageViewer from "../components/ImageViewer";
import NavigationBar from "../components/navigation_bar";
import style from  '../css/productDetailPage.module.css'
import antdStyle from 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Tabs } from 'antd';
import { Descriptions,InputNumber,Statistic } from "antd";
import { Button, Tooltip } from 'antd';

import { 
    BarcodeOutlined,
    HistoryOutlined, 
    HomeOutlined,
    KeyOutlined,
    LogoutOutlined, 
    ShoppingCartOutlined 
  } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function onQuantityChange(value) {
  console.log("Quantity Change to", value);
}


// Handles click of navigation bar menu item
const handleClick = ({ key }) => {
// TODO: Fix this to handle logout call
if (key.startsWith('/')) {
    history.push(key)
}
}


// Load Product Data
//const getProductData = async () => {  
//} 



function ProductDetailPage(){
    
    /*
    const [data, setData] = useState(null);
      
    const getProductData = async() => {
        try 
        {
            const response = await axios.get(`/api/product`, 
            {
                params: 
                {
                    sessionKey: sessionStorage.getItem("sessionKey"),
                    productCode: '01194'
                }
            }, 
            {
                headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
            })

            console.log(response);

            this.setData({data:    response.data.data})
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    
    getProductData();
    */

    if(sessionStorage.getItem('user')){
        //Layout
        return (
            <>
            {/*<Layout className="layout">*/}

            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['/order']}>
                <Menu.Item style={{ width: '150px', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontSize: '1.25rem' }}>HOLYSAS</Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key="/">Home</Menu.Item>
                <Menu.Item icon={<HistoryOutlined />} key="/viewHistoryOrder">Order History</Menu.Item>
                <Menu.Item icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
                <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
                </Menu>
            </Header>

                <Content style={{ padding: '0 50px'}}> 
                    <div style = {{borderRadius: "2%"}} className={style.site_layout_content}>

                        {/* Title */}
                        <Row  gutter={[16, 16]}>
                            <Col flex={7} >
                                <div> <h2 style={{fontFamily: "Open Sans"}}> CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot</h2> </div>
                            </Col>
                        </Row>
                        <Row  gutter={[16, 16]}>
                            {/* Image Viewer */}
                            <Col flex={9} >
                                {/*<div style={{backgroundColor: "lightblue",minHeight:400}}> Image Viewer Component</div>*/}
                                <ImageViewer imageList={null}/>
                            </Col>

                            {/* CheckOut Box */}
                            <Col flex={3} >
                                <div style={{backgroundColor: "whiteSmoke", borderRadius: "5%"}}>  

                                    <div style={{padding: 20}}>
                                        <Statistic title="Total Price (AUD)" value={25.5} prefix="$" precision={2} />
                                    </div>
                                    <div style={{paddingLeft: 20}}> 
                                        <span> Quantity: </span>
                                        <InputNumber min={1} max={10} defaultValue={1} onChange={onQuantityChange} />
                                    </div>
                                    <div style={{padding: 20}}>
                                        <Button icon={<ShoppingCartOutlined />}>CheckOut</Button>
                                    </div>
                                
                                </div>
                            </Col>
                        </Row>
                        


                        <div style={{ padding: '40px 16px' }}>
                            <Divider orientation="left">Extra Information</Divider>
                            <Row gutter={[16, 16]}>
                            {/*    <Col span={4} offset={1}>
                                    <div > 
                                        Detail 1: Dummy <br/> 
                                        Detail 2: Dummy <br/> 
                                        Detail 3: Dummy <br/> 
                                    </div>
                                </Col>
                                <Col span={4}>
                                    <div > 
                                        Detail 4: Dummy <br/> 
                                        Detail 5: Dummy <br/> 
                                        Detail 6: Dummy <br/> 
                                    </div>
                                </Col>
                            */}
                             {/*   <Descriptions  bordered size="small" layout="horizontal" column={2}>
                                
                                    <Descriptions.Item key={1} label ={"Name"} span={2}> 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot </Descriptions.Item>
                                    <Descriptions.Item key={2} label ={"URL"} span={2}> http://www.holyoake.com </Descriptions.Item>
                                    <Descriptions.Item key={3} label ={"Static Pressure Min"}> 2 Pa </Descriptions.Item>
                                    <Descriptions.Item key={4} label ={"Static Pressure Max"}> 28 Pa </Descriptions.Item>
                                    <Descriptions.Item key={5} label ={"Noise Level NC Min"}> 5 NC </Descriptions.Item>
                                    <Descriptions.Item key={6} label ={"Noise Level NC Max"}> 32NC </Descriptions.Item>
                                
                                </Descriptions>
                            */}
                                <Descriptions bordered size="small" layout="horizontal" column={2}>
                                {
                                    Object.entries(productDataSource).map(([param, value]) => {
                                    return (
                                        <Descriptions.Item key={param} label={param.replace(/##[\w]*/g, "")}>
                                        {value}
                                        </Descriptions.Item>
                                    ) 
                                    })
                                }
                                </Descriptions>
                            </Row>
                        </div>


                        <div style={{ padding: '25px 16px' }}>
                            <Row  gutter={[16, 16]} style={{minHeight:250}}>
                            <Col flex={1}>
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="Description" key="1">
                                        Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake
                                    </TabPane>
                                    <TabPane tab="Specification" key="2">
                                    
                                    </TabPane>
                                    <TabPane tab="Downloads" key="3">
                                    
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                        
                        </div>

                    </div>
                </Content>
                       
                <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
            {/*</Layout>*/}
            </>
        )
    }
    //console.log(this.props.history)
    this.props.history.push('/login')
    console.log(this.props.history)
    return 'error?'
    
}

// Mock parameter data for products
const productDataSource = {
    "Name": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot",
    "URL##OTHER##": "http://www.holyoake.com",
    "Type Comments##OTHER##": " Holyoake Swirl Diffuser CFP-600/12 c/w Low Profile Plenum.",
    "Static Pressure Min##OTHER##": "2 Pa",
    "Static Pressure Max##OTHER##": "28 Pa",
    "Noise Level NC Min##OTHER##": "5 NC",
    "Noise Level NC Max##OTHER##": "32NC",
    "Model##OTHER##": "CFP-600/12 Low Profile complete with low profile plenum.",
    "Min Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "25.00",
    "Max Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "200.00",
    "Material Body##OTHER##": "Holyoake-Aluminium",
    "Material - Face##OTHER##": "Holyoake White",
    "Manufacturer##OTHER##": "Holyoake",
    "d_r##LENGTH##MILLIMETERS": "125.00",
    "Inlet Spigot Diameter##LENGTH##MILLIMETERS": "250.00",
    "Plenum Box Height##LENGTH##MILLIMETERS": "250.00",
    "Holyoake Product Range##OTHER##": "Holyoake Swirl Diffusers.",
    "Flow Nom##HVAC_AIR_FLOW##LITERS_PER_SECOND": "112.50",
    "Diffuser Width##LENGTH##MILLIMETERS": "595.00",
    "Plenum Box Width##LENGTH##MILLIMETERS": "570.00",
    //"Description##OTHER##": " Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake"
  }

export default withRouter(ProductDetailPage)
