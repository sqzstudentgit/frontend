//ant design
import { Form, Input, Button, Card, Row, Col, Divider,Select,Image} from 'antd';
import 'antd/dist/antd.css';
import { CheckCircleTwoTone, GlobalOutlined, UserAddOutlined, UserOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddAddressForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            contact:'',
            addr1:'',
            addr2:'',
            postcode:'',
            region:'',
            country:''
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
        console.log()
        axios({
            method:'get',
            url:'/api/customer/1',
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
            data:{
                
            },
        })
    }

    render(){
        console.log("Start Site")
        return(
            <Form
            onFinish={this._handleSubmit}
            >
                <Form.Item     
                    name="addr1"
                    value={this.state.addr1}
                    onChange={this._handleChange}
                    rules={[{required:true}]}
                >
                    Address Line 1:
                    <Input 
                        placeholder="Street address, P.O.box, company name, c/o"
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>

                <Form.Item
                    name="addr2"
                    value={this.state.addr2}
                    onChange={this._handleChange}
                    rules={[{required:true}]}
                >
                    Address Line 2:
                    <Input 
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>

                <Form.Item     
                    name="region"
                    value={this.state.region}
                    onChange={this._handleChange}
                    rules={[{required:true}]}
                >
                    State/Province/Region:
                    <Input 
                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                    />
                </Form.Item>

                <Form.Item     
                    name="postcode"
                    value={this.state.postcode}
                    onChange={this._handleChange}
                    rules={[{required:true}]}
                    >
                        Postcode:
                        <Input 
                            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                        />
                </Form.Item>

                <Form.Item     
                    name="country"
                    value={this.state.country}
                    onChange={this._handleChange}
                    rules={[{required:true}]}
                >
                    Country:
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