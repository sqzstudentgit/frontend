//ant design
import { Form, Input, Button, Card, Row, Col, Divider,Select,Image} from 'antd';
import { CheckCircleTwoTone, GlobalOutlined, UserAddOutlined, UserOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
import {message as antdMessage} from 'antd' ;

//React
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

const AddAddressForm = (props) => {
    
    const [customerCode, setCustomerCode] = useState(props.customerCode) 
    const [contact, setContact] = useState('')
    const [addr1, setAddr1] = useState('')
    const [addr2, setAddr2] = useState('')
    const [postcode, setPostcode] = useState('')
    const [region, setRegion] = useState('')
    const [country, setCountry] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    return(
        <Form
        className="address-form"
        initialValues={{remember: true}}
        onFinish={ e => {
            axios({
                method:'post',
                url:'/api/customer/'+customerCode+'/addresses',
                headers: {'Content-Type': 'application/JSON; charset=UTF- 8'},
                data:{
                    "contact":contact,
                    "address_line1": addr1,
                    "address_line2": addr2,
                    "postcode": postcode,
                    "region": region,
                    "country": country
                }
            })
            .then(
                (response)=>{
                    console.log("Create new address success");
                    console.log(response);                   
                    setError(false);
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    setError(true);
                    setErrorMessage(e.response.data);
                    antdMessage.info(errorMessage);
                }
            ) 
        }}
        >
            <Form.Item
                label="Contact"
                name="contact"
                value={contact}
                onChange={e => {
                    setContact(e.target.value);
                }}
                rules={[{required: true,message: 'Please input your contact!'}]}
            >
                <Input 
                    prefix={<PhoneOutlined className="site-form-item-icon" />} 
                />
            </Form.Item>

            <Form.Item
                label="Address Line 1"
                name="addr1"
                value={addr1}
                onChange={e => {
                    setAddr1(e.target.value);
                }}
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
                value={addr2}
                onChange={e => {
                    setAddr2(e.target.value);
                }}
                rules={[{required: true,message: 'Please input your address!'}]}
            >
                <Input 
                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                    placeholder="" 
                />
            </Form.Item>

            <Form.Item
                label="Postcode"
                name="postcode"
                value={postcode}
                onChange={e => {
                    setPostcode(e.target.value);
                }}
                rules={[{required: true,message: 'Please input your postcode!'}]}
            >
                <Input 
                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                />
            </Form.Item>

            <Form.Item
                label="Region"
                name="region"
                value={region}
                onChange={e => {
                    setRegion(e.target.value);
                }}
                rules={[{required: true,message: 'Please input your region!'}]}
            >
                <Input 
                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                />
            </Form.Item>
            
            <Form.Item
                label="Country"
                name="country"
                value={country}
                onChange={e => {
                    setCountry(e.target.value);
                }}
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

export default withRouter(AddAddressForm)