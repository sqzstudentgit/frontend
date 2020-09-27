import React from "react"
import {Link, withRouter} from 'react-router-dom'
import { Title } from "../components/Title"

import NavigationBar from "../components/navigation_bar";
import style from  '../css/productDetailPage.module.css'
import antdStyle from 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Tabs } from 'antd';
import { InputNumber } from "antd";
import { Button, Tooltip } from 'antd';
import {ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function onQuantityChange(value) {
  console.log("Quantity Change to", value);
}

function ProductDetailPage(){
      
        if(sessionStorage.getItem('user')){
            //Layout
            return (
                <>
                <NavigationBar/>
                <div className={antdStyle.layout}> 
                    <Content style={{ padding: '0 50px' }}> 
                        <div className={style.site_layout_content}>

                            <Row  gutter={[16, 16]}>
                                <Col flex={9} >
                                    <div style={{backgroundColor: "lightblue",minHeight:400}}> Image Viewer Component</div>
                                </Col>

                                <Col flex={7} >
                                    <div> <h2 style={{fontFamily: "Open Sans"}}> Dummy Product Name</h2> </div>
                                </Col>


                                {/* CheckOut Box */}
                                <Col flex={3} >
                                    <div style={{backgroundColor: "whiteSmoke"}}>  

                                        <div style={{padding: 20}}>
                                            <span > <b> $ 25.50 </b> </span>
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
                            



                            <Divider orientation="left">Extra Information</Divider>
                            <Row gutter={[16, 16]}>
                                <Col span={4} offset={1}>
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
                            </Row>




                            <Row  gutter={[16, 16]} style={{minHeight:250}}>
                                <Col flex={1}>
                                    <Tabs defaultActiveKey="1" onChange={callback}>
                                        <TabPane tab="Description" key="1">
                                        Demo Description Text
                                        </TabPane>
                                        <TabPane tab="Specification" key="2">
                                        Demo Specification Text
                                        </TabPane>
                                        <TabPane tab="Downloads" key="3">
                                        
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                            
                        

                        </div>
                    </Content>
                </div>
       
                </>
            )
        }
        //console.log(this.props.history)
        this.props.history.push('/login')
        console.log(this.props.history)
        return 'error?'
    
}

export default ProductDetailPage
