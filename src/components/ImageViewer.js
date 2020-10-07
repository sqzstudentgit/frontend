import React from "react";
import { Tabs } from 'antd';
import ThreeDModelPresenter from '../components/3DModel/ThreeDModelPresenter';
import modelIcon from '../assets/3dModel.png';

const { TabPane } = Tabs;

class ImageViewer extends React.Component {

    render() {
        
        if(this.props.imageList==null) {return (<></>);}
        else
        {
            // Creates The 3D Model Tabs
            const tab3DList = this.props.imageList.filter((imageInfo)=>imageInfo.is3DModelType == "Y" ).map((imageInfo) => {
                return imageInfo.is3DModelType=="Y" 
                ?
                    <TabPane  key={"3D"+imageInfo.id.toString()} tab={<img width="50" height="50" style = {{borderRadius: "10%"}} src={modelIcon} alt="3D Model"/>} >
                        <div style={{height:this.props.height, width:'100%'}} >
                            <ThreeDModelPresenter modelUrl={imageInfo.threeDModelLocation} />
                        </div>
                    </TabPane>
                :
                    <></>
                }
            );

            // Creates the Image Tabs
            const tabImageList = this.props.imageList.filter((imageInfo)=>imageInfo.is3DModelType == "N" ).map((imageInfo) => {
                return imageInfo.is3DModelType=="N" 
                ?
                    <TabPane key={imageInfo.id.toString()} tab={<img width="50" height="50" style = {{borderRadius: "10%"}}  src={imageInfo.smallImageLocation}/>} >
                        <img style = {{height: this.props.height,borderRadius: "5%"}}  src = {imageInfo.largeImageLocation}/>
                    </TabPane>
                :
                    <></>
                }
            );
            
            // Returns the Tabs for the image viewer
            return (
                <div style={{height: this.props.height, width:this.props.width}} >
                    <Tabs tabPosition="left" style={{ height: this.props.height }}>
                        {tab3DList}
                        {tabImageList}
                    </Tabs>
                </div>
            )

        }
    }
}


export default ImageViewer