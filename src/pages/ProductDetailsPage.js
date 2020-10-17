import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import ImageViewer from "../components/ImageViewer";
import NavigationBar from "../components/NavigationBar";
import style from  '../css/productDetailPage.module.css'
import { 
    Layout,
    Row, 
    Col, 
    Tabs,
    Descriptions,
    InputNumber,
    Statistic,
    Button, 
    Typography,
    Spin,
    Affix,
    Card,
} from 'antd';
import {  ShoppingCartOutlined } from '@ant-design/icons';



const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;

function callback(key) {
  console.log(key);
}

function onQuantityChange(value) {
}


function ProductDetailsPage({ history, match }){
    
    
    const [productInfo, setProductInfo] = useState(0);
      
    const getProductData = async(code) => {
        try 
        {
            const response = await axios.get(`/api/product`, 
            {
                params: 
                {
                    sessionKey: sessionStorage.getItem("sessionKey"),
                    productCode: code
                }
            }, 
            {
                headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
            })
            setProductInfo(response.data.data)
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    
    useEffect(() => {
        const { params } = match;
        getProductData(params.productCode);
    },[]);


    
    if(sessionStorage.getItem('user')){
        
        if(productInfo==null || productInfo==0) 
            return (
                <Layout style={{ minHeight: '100vh' }}>

                    {/* Top navigation bar */}
                    <NavigationBar  history={history} defaultSelected={null} />


                    {/* Main Content */}
                    <div style={{ marginTop: '50px'}}>
                        <Content style={{ padding: '50px 50px'}}> 
                        <Affix offsetTop={80}>
                            <Row justify="center" gutter={[32, 32]}>
                                <Col span={18}>
                                    <Card style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                                        <Title level={2} style={{ margin: '120px',fontFamily: 'sans-serif'}}> 
                                            <Row  gutter={[16, 16]}>  
                                                <Col flex={9} > Loading Product Information </Col>
                                                <Col flex={3} > <Spin/> </Col>
                                                <Col flex={9}></Col>
                                            </Row>
                                        </Title>
                                    </Card>
                                </Col>
                            </Row>
                            </Affix>
                        </Content>
                    </div>

                    {/* Footer */}
                    <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                </Layout>
            )
        else
            console.log("Loaded Product Info: ");
            console.log(productInfo)
            return (
                <Layout style={{ minHeight: '100vh' }}>

                    {/* Top navigation bar */}
                    <NavigationBar  history={history} defaultSelected='/product'/>
                    
                    {/* Main Content */}
                    <div style={{ marginTop: '50px'}}>
                    <Content style={{ padding: '50px 50px'}}> 
                        <Card style={{ borderRadius: '1.25rem' }} hoverable={true} >

                            {/* Title */}
                            <Row  gutter={[16, 16]}>
                                <Col flex={7} >
                                    <Title level={2} style={{ marginLeft: '120px',fontFamily: 'sans-serif'}}> {productInfo.productName}</Title>
                                </Col>
                            </Row>

                            {/* Image Viewer and Checkout box */}
                            <Row  gutter={[16, 16]}>

                                {/* Image Viewer */}
                                <Col flex={9} >
                                    <ImageViewer height={400} width={700} imageList={productInfo.imageList}/>
                                </Col>

                                {/* CheckOut Box */}
                                <Col flex={3} >
                                    <div style={{backgroundColor: "whiteSmoke", borderRadius: "5%"}}>  

                                        <div style={{padding: 20}}>
                                            <Statistic title="Total Price (AUD)" value={productInfo.price} prefix="$" precision={2} />
                                        </div>
                                        <div style={{paddingLeft: 20}}> 
                                            <span> Quantity: </span>
                                            <InputNumber min={1} max={10} defaultValue={1} onChange={onQuantityChange} />
                                        </div>
                                        <div style={{padding: 20}}>
                                            <Button icon={<ShoppingCartOutlined />}>Checkout</Button>
                                        </div>
                                    
                                    </div>
                                </Col>
                            </Row>                            

                            {/* Tabs */}
                            <div style={{ padding: '25px 16px' }}>
                                <Row  gutter={[16, 16]} style={{minHeight:250}}>
                                <Col flex={1}>
                                    <Tabs defaultActiveKey="1" onChange={callback}>
                                        <TabPane tab="Description" key="1">
                                            {productInfo.description1}
                                        </TabPane>
                                        <TabPane tab="Specification" key="2">
                                        
                                        </TabPane>
                                        <TabPane tab="Parameter" key="3">
                                        <Row gutter={[16, 16]}>
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
                                        </TabPane>
                                        <TabPane tab="Downloads" key="4">
                                        
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                            
                            </div>

                        </Card>
                    </Content>
                    </div>

                    {/* Footer */}
                    <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                </Layout>
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

export default withRouter(ProductDetailsPage)