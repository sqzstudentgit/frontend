//ant design
import { Typography,Form,Input,Button,Row, Col, Divider,Select,Image} from 'antd';
import {message as antdMessage} from 'antd' ;
import { CheckCircleTwoTone, GlobalOutlined, UserAddOutlined, UserOutlined, EnvironmentOutlined,PhoneOutlined,MailOutlined,MessageOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
//React
import React from "react";
import Axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';

const {Option} = Select;

class CreateForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customerCodeList: [],

            // Customer Information
            customerCode:'',
            title:'',
            firstName:'',
            lastName:'',
            nationalitycode:'',
            phone:'',
            email:'',
            details:'',

            // Address Information
            deliveryAddressLine1:'',
            deliveryAddressLine2:'', 
            deliveryRegionName:'', 
            deliveryCountryName:'',
            deliveryPostcode:'',

            error: false,
            errorMassage:'',
            createSuccess:false,
        }
        this._handleChangeInput =  this._handleChangeInput.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }

    // Read customers code list from API
     componentDidMount() {
         Axios({
                 method: 'get',           
                 url: 'api/customer_codes',
                 headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
             }             
             )
             .then(
                 (response)=>{
                     this.setState({
                         customerCodeList: response.data
                     })
                 }
             )
     }

     _handleChangeInput(e){
         let id = e.target.id
         this.setState({
             [id]: e.target.value
         })
     }

    _handleSubmit(e){
        Axios({
                method: 'post',           
                url: 'api/customers',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                      "customer":{
                                  "customer_code": this.state.customerCode,
                                  "title": this.state.title,
                                  "organization_desc": this.state.details,
                                  "first_name": this.state.firstName,
                                  "last_name": this.state.lastName,
                                  "phone": this.state.phone,
                                  "email": this.state.email,
                                  "nationality_code": this.state.nationalitycode
                              },
                      "address": {
                                  "contact": this.state.phone,
                                  "address_line1": this.state.deliveryAddressLine1,
                                  "address_line2": this.state.deliveryAddressLine2,
                                  "postcode": this.state.deliveryPostcode,
                                  "region": this.state.deliveryRegionName,
                                  "country": this.state.deliveryCountryName
                              }
                }
            }             
            )
            .then(
                (response)=>{
                    console.log("Create Customer Success!");
                    console.log(response);
                    let {address, customer} = response.data;
                    console.log("Create Customer ID:"+customer.id);
                    this.setState({
                        error:false,
                        createSuccess:true
                    })
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    this.setState({
                        error:true,
                        errorMassage: e.response.data.message
                    })
                    antdMessage.info(this.state.errorMassage);
                }
            )
            console.log(this.state) //test      
    }


render(){
    const { Title } = Typography;
    const { TextArea } = Input;
    
    // Redirect to switch customer page if create success
    if(this.state.createSuccess){
        return <Redirect to = {{ pathname: "/choose" }} />
    }

    // Read avaliable customer code information into the drop down list
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
            <Form.Item style={{marginTop:'20px', fontSize: '14px',textAlign: 'right', alignItems: 'center'}}>
                Go back to
                <Button type="link" href="\choose">Choose Customer</Button>
            </Form.Item>

            <div style={{display:'flex', alignItems: 'center', flexDirection:'column'}}>
                <div className="logo" style={{fontSize: '50px'}}>
                    <UserAddOutlined style={{color:'#0099ff'}}/>
                </div>
                
                <Title level={2} style={{marginBottom:'20px'}}>Create Customer Account</Title>
            </div>

            <div style={{marginLeft:'30px', alignItems: 'center', width:'95%'}}>
                <Row gutter={[10, 24]} justify="space-around">
                    <Divider orientation="left">Identity</Divider>
                    <Col span={5} >
                        <Form.Item
                            style={{fontSize: '16px'}}
                        >
                            Customer Code
                            <Select 
                            name="customerCode"
                            id="customerCode"
                            autoComplete="customerCode"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            placeholder="Choose a code:"
                            onChange={(value) => {this.state.customerCode = value}}
                            >
                                {children}
                            </Select>
                        </Form.Item>                       
                    </Col>

                    <Divider orientation="left">Basic Information</Divider>
                    <Col span={5}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                    >
                        Title
                        <Select 
                            name="title"
                            id="title"
                            autoComplete="title"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            onChange={(value) => {this.state.title = value}}
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
                        rules={[{required: true,message: 'Please input your first name!'}]}
                    >
                        First Name
                        <Input 
                            name="firstName"
                            id="firstName"
                            autoComplete="firstName"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            value={this.state.firstName}
                            onChange={this._handleChangeInput}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={5} >
                        <Form.Item
                            style={{fontSize: '16px'}}
                        >
                            Last Name
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="lastName"
                                name="lastName"
                                autoComplete="lastName"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                value={this.state.lastName}
                                onChange={this._handleChangeInput}
                            />
                        </Form.Item>                       
                    </Col>

                    <Col span={5}>
                    <Form.Item
                        style={{fontSize: '16px'}}
                    >
                        Nationality Code
                        <Select 
                            name="nationalitycode"
                            id="nationalitycode"
                            autoComplete="nationalitycode"
                            size="large"    
                            variant="outlined"
                            required
                            autoFocus
                            placeholder="Choose your nationality:"
                            onChange={(value) => {this.state.nationalitycode = value}}
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
                    >
                        Phone Number
                        <Input 
                            size="large"    
                            variant="outlined"
                            required
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            placeholder="XXXXXXXX"
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            value={this.state.phone}
                            onChange={this._handleChangeInput}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={11}>
                    <Form.Item
                        style={{fontSize: '16px'}} 
                    >
                        Email Address
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
                            value={this.state.email}
                            onChange={this._handleChangeInput}
                        />
                    </Form.Item>
                    </Col>

                    <Divider orientation="left">Delivery Addresses</Divider>

                    <Col span={5}></Col>
                    <Col span={11}>
                        <Form.Item     
                            style={{fontSize: '16px'}} 
                        >
                            Address Line 1
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryAddressLine1"
                                name="deliveryAddressLine1"
                                autoComplete="deliveryAddressLine1"
                                placeholder="Street address, P.O.box, company name, c/o"
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                                value={this.state.deliveryAddressLine1}
                                onChange={this._handleChangeInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    
                    <Col span={5}></Col>
                    <Col span={11}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                        >
                            Address Line 2
                            <Input 
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryAddressLine2"
                                name="deliveryAddressLine2"
                                autoComplete="deliveryAddressLine2"
                                placeholder="Apartment, suite, unit, building, floor, etc."
                                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                                value={this.state.deliveryAddressLine2}
                                onChange={this._handleChangeInput}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>

                    <Col span={5}></Col>
                    <Col span={11}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryRegionName}
                            onChange={this._handleChangeInput}
                        >
                            State/Province/Region
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
                    <Col span={5}></Col>

                    <Col span={5}></Col>
                    <Col span={11}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryCountryName}
                            onChange={this._handleChangeInput}
                        >
                            Country
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
                    <Col span={5}></Col>

                    <Col span={5}></Col>
                    <Col span={11}>
                        <Form.Item     
                            style={{fontSize: '16px'}}
                            value={this.state.deliveryPostcode}
                            onChange={this._handleChangeInput}
                        >
                            Postcode
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
                    <Col span={5}></Col>

                    <Divider orientation="left">Squizz Organization Details:</Divider>
                    <Col span={23} >
                        <Form.Item   
                            style={{ fontSize: '16px'}}
                            value={this.state.details}
                            onChange={this._handleChangeInput}
                        >
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
