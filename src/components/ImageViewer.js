import React from "react";
import { Tabs, Image } from 'antd';
import ThreeDModelPresenter from '../components/3DModel/ThreeDModelPresenter';

const { TabPane } = Tabs;

class ImageViewer extends React.Component {

    render() {
        
        if(this.props.imageList==null) {return (<></>);}
        else
        {
            console.log('imageList: ');
            console.log(this.props.imageList);
            const tabList = this.props.imageList.map((imageInfo) => {
                return imageInfo.is3DModelType=="N" 
                ?
                    <TabPane key={imageInfo.id.toString()} tab={<img width="70" height="70" style = {{borderRadius: "10%"}}  src={imageInfo.smallImageLocation}/>} >
                        <img style = {{height: this.props.height,borderRadius: "5%"}}  src = {imageInfo.largeImageLocation}/>
                    </TabPane>
                :
                    <TabPane tab="3D Model" key="6">
                        <div style={{height:this.props.height, width:'100%'}} >
                            <ThreeDModelPresenter modelUrl={imageInfo.threeDModelLocation} />
                        </div>
                    </TabPane>
                }
            );
            /*const tabList = this.props.imageList.map((imageInfo) =>
                <p key={imageInfo.id.toString()}> {imageInfo.fileName} </p>
            );*/
            console.log(tabList)

            return (
                <div style={{height: this.props.height, width:this.props.width}} >
                    

                    <Tabs tabPosition="left" style={{ height: this.props.height }}>
                        {tabList}
                    </Tabs>
                </div>
            )

            return (
                <div style={{height: this.props.height, width:this.props.width}} >
                    <Tabs tabPosition="left" style={{ height: this.props.height }}>
                        <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_medium/2117.jpg"/>} key="1" >
                            <img style = {{maxHeight: this.props.height,borderRadius: "5%"}}  src = "https://attachments.holyoake.com/products/images_medium/2117.jpg"/>
                        </TabPane>
                        <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>} key="2">
                            <img style = {{ maxHeight: this.props.height, borderRadius: "5%"}}  src = "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>
                        </TabPane>
                        <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>} key="3">
                            <img style = {{ maxHeight: this.props.height, borderRadius: "5%"}} src = "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>
                        </TabPane>
                        <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>} key="4">
                            <img style = {{ maxHeight: this.props.height, borderRadius: "5%"}}  src = "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288"/>
                        </TabPane>
                        <TabPane tab={<img width="70" height="70" style = {{borderRadius: "10%"}} src="https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>} key="5">
                            <img style = {{ maxHeight: this.props.height, borderRadius: "5%"}} src = "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306"/>
                        </TabPane>

                        <TabPane tab="3D Model" key="6">
                            <div style={{height:this.props.height, width:'100%'}} >
                                <ThreeDModelPresenter modelUrl="https://holysas-3d-images.s3.amazonaws.com/model2.glb" />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            )

        }
    }
}


export default ImageViewer