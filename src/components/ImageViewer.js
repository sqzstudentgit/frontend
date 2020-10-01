import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col, Divider } from 'antd';
import { Tabs } from 'antd';
import { InputNumber } from "antd";
import { Button, Tooltip } from 'antd';
import ThreeDModelPresenter from '../components/3DModel/ThreeDModelPresenter';
//import style from '../css/product.module.css'

const { TabPane } = Tabs;

class ImageViewer extends React.Component {

    render() {
        console.log(this.props.imageList);

        return (
            <Tabs tabPosition="left">
                <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_medium/2117.jpg"/>} key="1" >
                    <img width="400" style = {{borderRadius: "5%"}}  src = "https://attachments.holyoake.com/products/images_medium/2117.jpg"/>
                </TabPane>
                <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>} key="2">
                    <img width="400" style = {{borderRadius: "5%"}}  src = "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>
                </TabPane>
                <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>} key="3">
                    <img width="400" style = {{borderRadius: "5%"}} src = "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>
                </TabPane>
                <TabPane tab="3D Model" key="4">
                    <div style={{height: "400", width:"400"}} >
                        <ThreeDModelPresenter modelUrl="https://holysas-3d-images.s3.amazonaws.com/model1.glb" />
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}


export default ImageViewer