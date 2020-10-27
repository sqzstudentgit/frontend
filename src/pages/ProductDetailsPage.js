import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import ImageViewer from "../components/ImageViewer";
import NavigationBar from "../components/NavigationBar";
import ModelMetadata from "../components/ModelMetadata";
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
    notification,
    Affix,
    Card,
} from 'antd';
import {  ShoppingCartOutlined } from '@ant-design/icons';
import { useStoreActions } from 'easy-peasy';



const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;




function ProductDetailsPage({ history, match }){
    

    const [productInfo, setProductInfo] = useState(0);
    const readdProduct = useStoreActions(actions => actions.cart.readdProduct);
    const [metadata, setMetadata] = useState(null);
    
    // Get Product Data from API
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

    // Get Product MetaData from API
    const getProductMetaData = async(code) => {
        try 
        {
            // Retrieve 3D model metadata (if it exists) for the product
            const response = await axios.get('/api/metadata/get', 
            {
                params: 
                {
                  productCode: code
                }
            });
        
            // Check if 3D model metadata exists for the product
            if (response.data.found) 
            {
                setMetadata(response.data.json_data);
            }
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    
    // Event Handler for Product Quantity Change
    const onQuantityChange = (value) => {
        productInfo.quantity = value;
    }

    // Event Handler for Checkout Button
    const checkOutClicked = (value) => {
        readdProduct(productInfo);
        notification.success({ 
            message: 'Product was successfully readded to the cart',
            placement: 'topRight'
        });
    }

    useEffect(() => {
        const { params } = match;
        getProductData(params.productCode);
        getProductMetaData(params.productCode); 
        


        if(productInfo!=null && productInfo!=0) 
            productInfo.quantity = 1;
    },[]);


    
    if(sessionStorage.getItem('user')){
        
        if(productInfo==null || productInfo==0) 
            return (
                <Layout style={{ minHeight: '100vh' }}>

                    {/* Top navigation bar */}
                    <NavigationBar  history={history} defaultSelected={null} />


                    {/* Main Content */}
                    <Content style={{ padding: '100px 100px'}}> 
                        <div style={{ marginTop: '150px'}}>
                            
                            <Row  gutter={[32, 32]}>  
                                <Col flex={9} ></Col>
                                <Col flex={0} > <Spin size="large"/> </Col>
                                <Col flex={9}></Col>
                            </Row>
                        </div>
                    </Content>

                    {/* Footer */}
                    <Footer style={{ position: "sticky", bottom: "0", textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                </Layout>
            )
        else
            productInfo.quantity = 1;
            const { imageList } = productInfo;
            productInfo.IsHolyOakes = (imageList && imageList.find(image => image.is3DModelType == 'Y'))!=null;

            console.log("Loaded Product Info: ");
            console.log(productInfo)
            console.log("Is HolyOaks: "+productInfo.IsHolyOakes)
            console.log("Loaded Metadata: ");
            console.log(metadata);
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
                                    <ImageViewer height={500} width={600} imageList={productInfo.imageList}/>
                                </Col>

                                {/* CheckOut Box */}
                                <Col flex={3} >
                                    <div style={{backgroundColor: "whiteSmoke", borderRadius: "5%"}}>  

                                        <div style={{padding: 20}}>
                                            <Statistic title="Total Price (AUD)" value={productInfo.price} prefix="$" precision={2} />
                                        </div>
                                        <div style={{paddingLeft: 20}}> 
                                            <span> Quantity: </span>
                                            <InputNumber min={1} max={100} defaultValue={1} onChange={onQuantityChange} />
                                        </div>
                                        <div style={{padding: 20}}>
                                            <Button  icon={<ShoppingCartOutlined />} onClick={checkOutClicked}>Add to cart</Button>
                                        </div>
                                    
                                    </div>
                                </Col>
                            </Row>                            

                            {/* Tabs */}
                            <div style={{ padding: '25px 16px' }}>
                                <Row  gutter={[16, 16]} style={{minHeight:250}}>
                                <Col flex={1}>
                                    <Tabs defaultActiveKey="1" >
                                        <TabPane tab="Description" key="1">
                                            
                                            {   
                                                productInfo.description1=="" || productInfo.description1==null 
                                                ? 
                                                    'Coming Soon' 
                                                : 
                                                    <div dangerouslySetInnerHTML={{ __html: productInfo.description1 }} />
                                            }  

                                        </TabPane>
                                        <TabPane tab="Specification" key="2">
                                            
                                            {   
                                                productInfo.description2=="" || productInfo.description2==null 
                                                ? 
                                                    'Coming Soon' 
                                                : 
                                                    <div dangerouslySetInnerHTML={{ __html: productInfo.description2 }} />
                                            }  

                                        </TabPane>
                                        { metadata ? (
                                            
                                                <TabPane tab="Parameter" key="3">
                                                    <Row gutter={[16, 16]}>
                                                        <ModelMetadata metadata={metadata} />
                                                    </Row>
                                                </TabPane>
                                        ) : (
                                            null
                                        )
                                            
                                        }
                                        <TabPane tab="Downloads" key="4">
                                            
                                            Coming Soon

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

    this.props.history.push('/login')
    console.log(this.props.history)
    return 'error?'
    
}

export default withRouter(ProductDetailsPage)