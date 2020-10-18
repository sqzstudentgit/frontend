//ant design
import { Form, Input, Button, Card, Row, Col, Divider,Select,Image} from 'antd';
import { CheckCircleTwoTone, GlobalOutlined, UserAddOutlined, UserOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
import {message as antdMessage} from 'antd' ;

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddAddressForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            customerCode:11, //Todo: test purpose, change to dynamic customer code in future

            contact:'',
            addr1:'',
            addr2:'',
            postcode:'',
            region:'',
            country:'',

            error:false,
            errorMessage:''
        }
        this._handleChange =  this._handleChange.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }

    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    _handleSubmit(e){
        axios({
            method:'post',
            url:'/api/customer/'+this.state.customerCode+'/addresses',
            headers: {'Content-Type': 'application/JSON; charset=UTF- 8'},
            data:{
                "contact":this.state.contact,
                "address_line1": this.state.addr1,
                "address_line2": this.state.addr2,
                "postcode": this.state.postcode,
                "region": this.state.region,
                "country": this.state.country
            }
        })
        .then(
            (response)=>{
                console.log("Create new address success")
                console.log(response)
                this.setState({
                    error:false
                })
            }
        )
        .catch(
            (e)=>{
                console.log(e)
                this.setState({
                    error:true,
                    errorMessage:e.response.data
                })
                antdMessage.info(this.state.errorMessage);
            }
        )
    }

    render(){
        console.log("Start create new address")
        return(
            <Form
            className="address-form"
            initialValues={{remember: true}}
            onFinish={this._handleSubmit}
            >
                <Form.Item
                    label="Contact"
                    name="contact"
                    value={this.state.contact}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your contact!'}]}
                >
                    <Input 
                        prefix={<PhoneOutlined className="site-form-item-icon" />} 
                    />
                </Form.Item>

                <Form.Item
                    label="Address Line 1"
                    name="addr1"
                    value={this.state.addr1}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your address!'}]}
                >
                    <Input 
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                        placeholder="Street address, P.O.box, company name, c/o" 
                    />
                </Form.Item>

                <Form.Item
                    label="Address Line 2"
                    name="addr2"
                    value={this.state.addr2}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your address!'}]}
                >
                    <Input 
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                        placeholder="" 
                    />
                </Form.Item>

                <Form.Item
                    label="Region"
                    name="region"
                    value={this.state.region}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your region!'}]}
                >
                    <Input 
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                    />
                </Form.Item>

                <Form.Item
                    label="Postcode"
                    name="postcode"
                    value={this.state.postcode}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your postcode!'}]}
                >
                    <Input 
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                    />
                </Form.Item>

                <Form.Item
                    label="Country"
                    name="country"
                    value={this.state.country}
                    onChange={this._handleChange}
                    rules={[{required: true,message: 'Please input your country!'}]}
                >
                    <Input 
                        prefix={<GlobalOutlined className="site-form-item-icon" />} 
                    />
                </Form.Item>

                <Form.Item style={{ fontSize: '16px', textAlign: 'center', alignItems: 'center'}}>
                    <Button 
                        type="primary"
                        htmlType="submit" 
                        className="addaddress-form-button"
                    >
                    Add New Address
                    </Button>
                </Form.Item>

            </Form>
        )
    }


}//end AddAddressForm

export default AddAddressForm