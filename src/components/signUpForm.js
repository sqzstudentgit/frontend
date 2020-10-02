//ant design
import 'antd/dist/antd.css';
import { Typography,Form,Input,Checkbox,Button,Row, Col } from 'antd';
import { UserAddOutlined, UserOutlined, CreditCardOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
//React
import React from "react";
import Axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import ErrorMessage from './errorMessage';

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            preferredName:'',
            phone:'',
            email:'',
            password:'',
            card:'',
            billingAddress:'',
            deliveryAddress:'',
            details:'',

            error: false,
            errorMassage:'',
            isLogout:true
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
        // e.preventDefault();//test need
        Axios({
                method: 'post',           
                url: 'api/customers',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "nickName": this.state.preferredName,
                    "phone": this.state.phone,
                    "email": this.state.email,
                    "password": this.state.password,
                    "card": this.state.card,
                    "billingAddress": this.state.billingAddress,
                    "deliveryAddress": this.state.deliveryAddress,
                    "details": this.state.details,   
                }
            }             
            )
            .then(
                (response)=>{
                    console.log(response);
                    let {status, message} = response.data;
                    let {session_id} = response.data.data;
                    console.log(message);
                    //alert(message);
                    if(status=="success"){
                        sessionStorage.setItem('user', this.state.username);
                        sessionStorage.setItem('sessionKey', session_id);
                        this.setState({
                            error:false,
                            isLogout:false
                        })
                    }
                    else{
                        this.setState({
                            error:true,
                            errorMassage:""
                        })
                    } 
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    this.setState({
                        error:true,
                        errorMassage: e.response.data
                    })

                }
            )
            console.log(this.state) //test
      
    }


render(){
    if (!this.state.isLogout){
        this.state.isLogout = true
        return <Redirect to = {{ pathname: "/" }} />
    }//end if

    const {error, errorMassage} = this.state;
    const { Title } = Typography;

    return (
        <Form style={{width:'100%'}}
        className="register-form"
        initialValues={{remember: true}}
        onFinish={this._handleSubmit}
        >
            <Form.Item style={{marginTop:'20px', fontSize: '14px',textAlign: 'right', alignItems: 'center'}}>
                Go back to
                <Button type="link" href="\login">choose customer</Button>
            </Form.Item>

            <div style={{display:'flex', alignItems: 'center', flexDirection:'column'}}>
                <div className="logo" style={{fontSize: '50px'}}>
                    <UserAddOutlined style={{color:'#4169e1'}}/>
                </div>
                
                <Title level={2} style={{marginBottom:'20px'}}>Create Customer Account</Title>
            </div>

            <div style={{marginLeft:'50px', alignItems: 'center', width:'95%'}}>
                <Row justify="space-between">
                    <Col span={4}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.firstName}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your first name!'}]}
                    >
                        First Name:
                        <Input 
                            name="firstName"
                            id="firstName"
                            autoComplete="firstName"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={4} >
                        <Form.Item
                            style={{fontSize: '16px'}}
                            value={this.state.lastName}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Please input your last name!'}]}
                        >
                            Last Name:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="lastName"
                                name="lastName"
                                autoComplete="lastName"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        
                    </Col>

                    <Col span={12} offset={2}>
                        <Form.Item     
                            style={{marginRight:'50px', fontSize: '16px'}}
                            value={this.state.card}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Please input your card number!'}]}
                        >
                            Card Number:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="card"
                                name="card"
                                autoComplete="card"
                                placeholder="Add your card."
                                prefix={<CreditCardOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.preferredName}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your preferred name!'}]}
                    >
                        Preferred Name:
                        <Input 
                            size="large"    
                            variant="outlined"
                            required
                            id="preferredName"
                            name="preferredName"
                            autoComplete="preferredName"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={4}>
                    </Col>

                    <Col span={12} offset={2}>
                        <Form.Item     
                            style={{marginRight:'50px', fontSize: '16px'}}
                            value={this.state.billingAddress}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Please input your billing address!'}]}
                        >
                            Billing Address:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingAddress"
                                name="billingAddress"
                                autoComplete="billingAddress"
                                placeholder="Enter a billing address."
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.phone}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your phone number!'}]}
                    >
                        Phone Number:
                        <Input 
                            size="large"    
                            variant="outlined"
                            required
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            placeholder="XXXXXXXX"
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={12} offset={2}>
                        <Form.Item     
                            style={{marginRight:'50px', fontSize: '16px'}}
                            value={this.state.deliveryAddress}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Please input your delivery address!'}]}
                        >
                            Delivery Address:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryAddress"
                                name="deliveryAddress"
                                autoComplete="deliveryAddress"
                                placeholder="Enter a delivery address."
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.email}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your email!'}]}
                    >
                        Email Address:
                        <Input 
                            size="large"    
                            variant="outlined"
                            required
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="XXXXXXXX@XXXX.com"
                            type="email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={12} offset={2}>
                        <Form.Item     
                            style={{marginRight:'50px', fontSize: '16px'}}
                            value={this.state.details}
                            onChange={this._handleChange}
                        >
                            Squizz Organization Details:
                            <Input 
                                size="large"
                                variant="outlined"
                                id="details"
                                name="details"
                                autoComplete="details"
                                prefix={<MessageOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    {/* <Col span={9}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.password}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your password!'}]}
                    >
                        Password:
                        <Input.Password 
                            size="large"    
                            variant="outlined"
                            required
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            placeholder="Enter your password."   
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    </Col> */}

                    <Col span={12} offset={2}>
                    </Col>
                </Row> 
            </div>

            {/* <Form.Item name="allowEmails" valuePropName="checked" style={{textAlign: 'center', alignItems: 'center'}}>
                <Checkbox value="allowExtraEmails" color="primary">
                    I want to receive inspiration, marketing promotions and updates via email.
                </Checkbox>
            </Form.Item> */}

            <Form.Item style={{textAlign: 'center', alignItems: 'center'}}>
                <Button type="primary" htmlType="submit" className="signup-form-button">
                Create
                </Button>
            </Form.Item>

            <Form.Item style={{ marginBottom:'0px', fontSize: '8px', textAlign: 'center' }}>Copyright ©COMP90082 Squizz </Form.Item>
        </Form>
    )//end return
}

}
export default SignUpForm
