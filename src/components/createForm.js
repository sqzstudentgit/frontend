//ant design
import 'antd/dist/antd.css';
import { Typography,Form,Input,Button,Row, Col, Divider,Select,Image} from 'antd';
import { CheckCircleTwoTone, GlobalOutlined, UserAddOutlined, UserOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
//React
import React from "react";
import Axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import ErrorMessage from './errorMessage';

class CreateForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customerCodeList: ["001"],

            title:'',
            firstName:'',
            lastName:'',
            nationalitycode:'',
            phone:'',
            email:'',

            billingAddressLine1:'',
            deliveryAddressLine1:'',
            billingAddressLine2:'',
            deliveryAddressLine2:'', 
            billingRegionName:'', 
            deliveryRegionName:'', 
            billingCountryName:'',
            deliveryCountryName:'',
            billingPostcode:'',
            deliveryPostcode:'',

            details:'',

            error: false,
            errorMassage:'',
            //isLogout:true
        }
        this._handleChange =  this._handleChange.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }
    componentDidMount() {
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
                    "title":this.state.title,
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "nationalitycode":this.state.nationalitycode,
                    "phone": this.state.phone,
                    "email": this.state.email,

                    "billingAddressLine1":this.state.billingAddressLine1,
                    "deliveryAddressLine1":this.state.deliveryAddressLine1,
                    "billingAddressLine2":this.state.billingAddressLine2,
                    "deliveryAddressLine2":this.state.deliveryAddressLine2, 
                    "billingRegionName":this.state.billingRegionName, 
                    "deliveryRegionName":this.state.deliveryRegionName, 
                    "billingCountryName":this.state.billingCountryName,
                    "deliveryCountryName":this.state.deliveryCountryName,
                    "billingPostcode":this.state.billingPostcode,
                    "deliveryPostcode":this.state.deliveryPostcode,

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
                            errorMassage:"Please enter in the correct format!"
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
    const {error, errorMassage} = this.state;
    const { Title } = Typography;
    const { TextArea } = Input;
    const { Option } = Select;

    const children = [];
    for (let i=0; i < this.state.customerCodeList.length; i++) {
        children.push(<Option key={this.state.customerCodeList[i]}>{this.state.customerCodeList[i]}</Option>);
    }

    return (
        <Form style={{width:'100%'}}
        className="register-form"
        initialValues={{remember: true}}
        onFinish={this._handleSubmit}
        >
            {error && <ErrorMessage massage={errorMassage}/>} 
            <Form.Item style={{marginTop:'20px', fontSize: '14px',textAlign: 'right', alignItems: 'center'}}>
                Go back to
                <Button type="link" href="\login">Choose Customer</Button>
            </Form.Item>

            <div style={{display:'flex', alignItems: 'center', flexDirection:'column'}}>
                <div className="logo" style={{fontSize: '50px'}}>
                    <UserAddOutlined style={{color:'#0099ff'}}/>
                </div>
                
                <Title level={2} style={{marginBottom:'20px'}}>Create Customer Account</Title>
            </div>

            <div style={{marginLeft:'30px', alignItems: 'center', width:'95%'}}>
                <Row gutter={[10, 24]} justify="space-around">
                    <Divider orientation="left">Identity:</Divider>
                    <Col span={5} >
                        <Form.Item
                            style={{fontSize: '16px'}}
                            value={this.state.customerCode}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Please choose your code!'}]}
                        >
                            Customer Code:
                            <Select 
                            name="customerCode"
                            id="customerCode"
                            autoComplete="customerCode"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            placeholder="Choose a code:"
                            >
                                {children}
                            </Select>
                        </Form.Item>                       
                    </Col>

                    <Divider orientation="left">Basic Information</Divider>
                    <Col span={5}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.title}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please choose your title!'}]}
                    >
                        Title:
                        <Select 
                            name="title"
                            id="title"
                            autoComplete="title"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                        >
                                <Option value="Mr.">Mr.</Option>
                                <Option value="Mrs.">Mrs.</Option>
                                <Option value="Ms.">Ms.</Option>
                                <Option value="Miss">Miss</Option>
                        </Select>
                    </Form.Item>
                    </Col>

                    <Col span={5}>
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

                    <Col span={5} >
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

                    <Col span={5}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                        value={this.state.nationalitycode}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please choose your nationality code!'}]}
                    >
                        Nationality Code:
                        <Select 
                            name="customerCode"
                            id="customerCode"
                            autoComplete="customerCode"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            placeholder="Choose your nationality:"
                            >
                                <Option value="AU">AU</Option>
                                <Option value="CA">CA</Option>
                                <Option value="CN">CN</Option>
                                <Option value="ES">ES</Option>
                                <Option value="FR">FR</Option>
                                <Option value="GB">GB</Option>
                        </Select>
                    </Form.Item>
                    </Col>


                    <Col span={11}>
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

                    <Col span={11}>
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

                    <Divider orientation="left">Addresses:</Divider>
                    <Col span={7} offset={5}>
                        <Form.Item             
                            style={{marginRight:'50px',fontWeight: 'bold',  fontSize: '16px'}}
                        >
                               Billing Address
                        </Form.Item>
                    </Col>
                   
                    <Col span={7} offset={5}>
                        <Form.Item             
                            style={{marginRight:'50px', fontWeight: 'bold', fontSize: '16px'}}
                        >
                               Delivery Address
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.billingAddressLine1}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Street address, P.O.box, company name, c/o'}]}
                        >
                            Address Line 1:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingAddressLine1"
                                name="billingAddressLine1"
                                autoComplete="billingAddressLine1"
                                placeholder="Street address, P.O.box, company name, c/o"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryAddressLine1}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Street address, P.O.box, company name, c/o'}]}
                        >
                            Address Line 1:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryAddressLine1"
                                name="deliveryAddressLine1"
                                autoComplete="deliveryAddressLine1"
                                placeholder="Street address, P.O.box, company name, c/o"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.billingAddressLine2}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Apartment, suite, unit, building, floor, etc.'}]}
                        >
                            Address Line 2:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingAddressLine2"
                                name="billingAddressLine2"
                                autoComplete="billingAddressLine2"
                                placeholder="Apartment, suite, unit, building, floor, etc."
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryAddressLine2}
                            onChange={this._handleChange}
                            rules={[{required: true,message: 'Apartment, suite, unit, building, floor, etc.'}]}
                        >
                            Address Line 2:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryAddressLine2"
                                name="deliveryAddressLine2"
                                autoComplete="deliveryAddressLine2"
                                placeholder="Apartment, suite, unit, building, floor, etc."
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.billingRegionName}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            State/Province/Region:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingRegionName"
                                name="billingRegionName"
                                autoComplete="billingRegionName"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryRegionName}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            State/Province/Region:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryRegionName"
                                name="deliveryRegionName"
                                autoComplete="deliveryRegionName"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>


                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.billingCountryName}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            Country:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingCountryName"
                                name="billingCountryName"
                                autoComplete="billingCountryName"
                                prefix={<GlobalOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryCountryName}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            Country:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryCountryName"
                                name="deliveryCountryName"
                                autoComplete="deliveryCountryName"
                                prefix={<GlobalOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.billingPostcode}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            Postcode:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="billingPostcode"
                                name="billingPostcode"
                                autoComplete="billingPostcode"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={9}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryPostcode}
                            onChange={this._handleChange}
                            rules={[{required: true,message: ''}]}
                        >
                            Postcode:
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryPostcode"
                                name="deliveryPostcode"
                                autoComplete="deliveryPostcode"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                    </Col>


                    <Divider orientation="left">Squizz Organization Details:</Divider>
                    <Col span={23} >
                        <Form.Item   
                            style={{ fontSize: '16px'}}
                            value={this.state.details}
                            onChange={this._handleChange}
                        >
                            Details:
                            <TextArea 
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                variant="outlined"
                                id="details"
                                name="details"
                                autoComplete="details"
                            />
                        </Form.Item>
                    </Col>

                </Row> 
            </div>

            <Form.Item style={{ fontSize: '16px', textAlign: 'center', alignItems: 'center'}}>
                <Button 
                    type="primary"
                    shape="round" 
                    icon={<CheckCircleTwoTone />} 
                    size='large' 
                    htmlType="submit" 
                    className="signup-form-button"
                >
                Create
                </Button>
            </Form.Item>

            <Form.Item style={{ marginBottom:'0px', fontSize: '8px', textAlign: 'center' }}>Copyright ©COMP90082 Squizz </Form.Item>
        </Form>
    )//end return
}

}
export default CreateForm
