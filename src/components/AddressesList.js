//ant design
import { Form, Input, Button, Card, Select, Row, Col, Divider,Modal} from 'antd';
import {message as antdMessage} from 'antd' ;
import { GlobalOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';

//Linked Components
import AddAddressForm from '../components/AddAddressForm';
import { IdBadge } from 'styled-icons/fa-regular';

class AddressesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customerCode: '11', //Todo: test purpose, change to dynamic customer code in future
            
            //List of all addresses for the customer
            addresses:[],       //all addresses are formatted into string, seperate by ";"
            addressesJson:[],   //all addresses are in JSON formats

            //Delivery Address
            currDeliveryAddr:'',
            currDeliveryAddrJson:'',
            currDContact:'',
            currDAddr1:'',
            currDAddr2:'',
            currDRegion:'',
            currDCountry:'',
            currDPostcode:'',

            //Billing Address
            currBContact:'',
            currBillAddr:'',
            currBillAddrJson:'',
            currBAddr1:'',
            currBAddr2:'',
            currBRegion:'',
            currBCountry:'',
            currBPostcode:'',

            contact:'',
            addr1:'',
            addr2:'',
            region:'',
            country:'',
            postcode:'',
            error:false,
            errorMessage:'',

            DAddrSelect:'none',
            BAddrSelect:'none',

            addAddr:'none',
        }
        this.handleDAddrChange =  this.handleDAddrChange.bind(this);
        this.handleBAddrChange =  this.handleBAddrChange.bind(this);
        this._handleChange =  this._handleChange.bind(this);
    }

    handleDAddrChange(e){
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            this.setState({
                addAddr:''
            })
        }else{
            this.setState({
                currDeliveryAddr:this.state.addresses[e],
                currDeliveryAddrJson:this.state.addressesJson[e],
                addAddr:'none',
                
                currDContact:this.state.addressesJson[e].contact,
                currDAddr1:this.state.addressesJson[e].address_line1,
                currDAddr2:this.state.addressesJson[e].address_line2,
                currDRegion:this.state.addressesJson[e].region,
                currDCountry:this.state.addressesJson[e].country,
                currDPostcode:this.state.addressesJson[e].postcode,
            })
        }
    }

    handleBAddrChange(e){
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            this.setState({
                addAddr:''
            })
        }else{
            this.setState({
                currBillAddr:this.state.addresses[e],
                currBillAddrJson:this.state.addressesJson[e],
                addAddr:'none',
                
                currBContact:this.state.addressesJson[e].contact,
                currBAddr1:this.state.addressesJson[e].address_line1,
                currBAddr2:this.state.addressesJson[e].address_line2,
                currBRegion:this.state.addressesJson[e].region,
                currBCountry:this.state.addressesJson[e].country,
                currBPostcode:this.state.addressesJson[e].postcode,
            })
        }
    }

    _handleChange(e){
        console.log(e.target.id, e.target.value)
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
        console.log(this.state.currDAddr1)
    }

    componentDidMount(){
        axios({
            method:'get',
            url:'api/customer/'+this.state.customerCode+'/addresses',
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'}
        })
        .then(
            (response)=>{
                console.log(response);
                // Reformat the address information so that it fits the selection box
                for(let i=0; i<response.data.length; i++){
                    var temp_addr=JSON.parse(JSON.stringify(response.data[i]));
                    var format_addr="";
                    for (var x in temp_addr){
                        if (x!=='id' && x!=='customer_id' && temp_addr[x]!==null){
                            format_addr += temp_addr[x]+"; "
                        }
                    }
                    this.setState({
                        addresses:this.state.addresses.concat(format_addr.slice(0, -2)),
                        addressesJson: this.state.addressesJson.concat(temp_addr)
                    })
                }
                this.setState({
                    currDeliveryAddr:this.state.addresses[0],
                    currDeliveryAddrJson:this.state.addressesJson[0],

                    currBillAddr:this.state.addresses[0],
                    currBillAddrJson:this.state.addressesJson[0],
                })
                this.setCurrentDAddrDetails();
                this.setCurrentBAddrDetails();
                console.log(this.state.currDeliveryAddrJson.contact)
            }
        )
        .catch(
            (e)=>{
                console.log(e)
                this.setState({
                    error:true,
                    errorMessage:e.response.data
                })
            }
        )
    }

    // Set Current Delivery Address Details
    setCurrentDAddrDetails(currJson){
        console.log("Detail Set") 
        this.setState({
            currDContact:this.state.currDeliveryAddrJson.contact,
            currDAddr1:this.state.currDeliveryAddrJson.address_line1,
            currDAddr2:this.state.currDeliveryAddrJson.address_line2,
            currDRegion:this.state.currDeliveryAddrJson.region,
            currDCountry:this.state.currDeliveryAddrJson.country,
            currDPostcode:this.state.currDeliveryAddrJson.postcode,
        })
    }

    // Set Current Billing Address Details
    setCurrentBAddrDetails(){
        console.log("Detail Set")
        this.setState({
            currBContact:this.state.currBillAddrJson.contact,
            currBAddr1:this.state.currBillAddrJson.address_line1,
            currBAddr2:this.state.currBillAddrJson.address_line2,
            currBRegion:this.state.currBillAddrJson.region,
            currBCountry:this.state.currBillAddrJson.country,
            currBPostcode:this.state.currBillAddrJson.postcode,
        })
    }

    state = {
        loading: false,
        dvisible: false,
        bvisible:false,
      };
    
      showModal = () => {
        this.setState({
          dvisible: true,
        });
      };
    
    handleEditOk = (e) => {
    this.setState({ loading: true });
    // Remove old address
    axios({
            method: 'delete',           
            url: '/api/customer/'+this.state.customerCode+'/address/'+this.state.currDeliveryAddrJson.id,
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
    })

    // Add modified new address
    axios({
            method: 'post',           
            url: '/api/customer/'+this.state.customerCode+'/addresses',
            headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
            data:{
            "contact": this.state.currDContact,
            "address_line1": this.state.currDAddr1,
            "address_line2": this.state.currDAddr2,
            "postcode": this.state.currDPostcode,
            "region": this.state.currDRegion,
            "country": this.state.currDCountry
            }
        }             
        )
        .then(
            (response)=>{
                console.log("Edit Address Success!");
                console.log(response);                  
                this.setState({
                    error:false,
                    loading: false, 
                    dvisible: false 
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
    };

    handleCancel = () => {
        this.setState({ dvisible: false });
      };


    // ======== Event handler for billing address ========
    showBModal = () => {
        this.setState({
          bvisible: true,
        });
      };

    handleBEditOk = (e) => {
        this.setState({ loading: true });
        // Remove old address
        axios({
                method: 'delete',           
                url: '/api/customer/'+this.state.customerCode+'/address/'+this.state.currBillAddrJson.id,
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
        })
    
        // Add modified new address
        axios({
                method: 'post',           
                url: '/api/customer/'+this.state.customerCode+'/addresses',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                "contact": this.state.currBContact,
                "address_line1": this.state.currBAddr1,
                "address_line2": this.state.currBAddr2,
                "postcode": this.state.currBPostcode,
                "region": this.state.currBRegion,
                "country": this.state.currBCountry
                }
            }             
            )
            .then(
                (response)=>{
                    console.log("Edit Address Success!");
                    console.log(response);                  
                    this.setState({
                        error:false,
                        loading: false, 
                        bvisible: false 
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
        };
    
      handleBCancel = () => {
        this.setState({ bvisible: false });
      };
    

      
    render(){

        console.log("Page Start")

        const { bvisible, dvisible, loading } = this.state;
        const addressesList = [];


        for(let i=0; i<this.state.addresses.length; i++){
            addressesList.push(<Option key={i}>{this.state.addresses[i]}</Option>)
        }
        addressesList.push(<Option key="-1">Add New Address</Option>);

        const { Text } = Typography;

        const form = {
            
        }

        return(
            <div>
                {/* Delivery Address Form */}
                <div>
                    <Divider orientation="left">Delivery Address</Divider>
                    <Form>
                        <Form.Item>
                            <Select
                                placeholder="Select/Add Delivery Address"
                                onChange={this.handleDAddrChange}
                            >
                                {addressesList}
                            </Select>
                        </Form.Item>

                        {/* Display Current Delivery Address */}
                        <Form.Item>
                            <div style={{lineHeight: '8px', marginLeft:'16px'}}>
                                <p>{this.state.currDAddr1}</p>
                                <p>{this.state.currDAddr2}</p>
                                <p>{this.state.currDRegion}, {this.state.currDCountry}, {this.state.currDPostcode}</p>
                                <p>Contact:    {this.state.currDContact}</p>
                            </div>
                            <Button type="link" onClick={this.showModal}>
                                Edit this address
                            </Button>
                        </Form.Item>

                        {/* Edit Address Form */}
                        <Form.Item>
                            <Modal
                                title="Edit Address"
                                visible={dvisible}
                                onOk={this.handleEditOk}
                                onCancel={this.handleCancels}
                                onChange={this._handleChange}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                    Return
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleEditOk}>
                                    Save Changes
                                    </Button>,
                                ]}
                            >
                                    <Form.Item
                                        id="currDContact"
                                        label="Contact"
                                        name="currDContact"
                                        value={this.state.currDContact}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your contact!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDContact}
                                            defaultValue={this.state.currDContact}
                                            size="large"
                                            prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                        >

                                        </Input>
                                    </Form.Item>
                    
                                    <Form.Item
                                        id = "currDAddr1"
                                        label="Address Line 1"
                                        name="currDAddr1"
                                        value={this.state.currDAddr1}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your address!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDAddr1}
                                            defaultValue={this.state.currDAddr1}
                                            size="large"
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDAddr2"
                                        label="Address Line 2"
                                        name="currDAddr2"
                                        value={this.state.currDAddr2}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your address!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDAddr2}
                                            defaultValue={this.state.currDAddr2}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDPostcode"
                                        label="Postcode"
                                        name="currDPostcode"
                                        value={this.state.currDPostcode}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your postcode!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDPostcode}
                                            defaultValue={this.state.currDPostcode}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDRegion"
                                        label="Region"
                                        name="currDRegion"
                                        value={this.state.currDRegion}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your region!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDRegion}
                                            defaultValue={this.state.currDRegion}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        id="currDCountry"
                                        label="Country"
                                        name="currDCountry"
                                        value={this.state.currDCountry}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your country!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDCountry}
                                            defaultValue={this.state.currDCountry}
                                            prefix={<GlobalOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                
                            </Modal>
                        </Form.Item>
                    </Form>
                </div>
                

                <div>
                    <Divider orientation="left">Billing Address</Divider>
                    <Form>
                        <Form.Item>
                            <Select
                                placeholder="Select/Add Delivery Address"
                                onChange={this.handleBAddrChange}
                            >
                                {addressesList}
                            </Select>
                        </Form.Item>

                        {/* Display Current Delivery Address */}
                        <Form.Item>
                            <div style={{lineHeight: '8px'}}>
                                {/* {formatDeliveryAddr} */}
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currBAddr1}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currBAddr2}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currBRegion}, {this.state.currBCountry}, {this.state.currBPostcode}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;Contact:    {this.state.currBContact}</p>
                            </div>
                        </Form.Item>

                        {/* Edit Address Form */}
                        <Form.Item>
                            <Modal
                                title="Edit Address"
                                visible={bvisible}
                                onOk={this.handleBEditOk}
                                onCancel={this.handleBCancels}
                                onChange={this._handleBChange}
                                footer={[
                                    <Button key="back" onClick={this.handleBCancel}>
                                    Return
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleEditOk}>
                                    Save Changes
                                    </Button>,
                                ]}
                            >
                                    <Form.Item
                                        id="currDContact"
                                        label="Contact"
                                        name="currDContact"
                                        value={this.state.currDContact}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your contact!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDContact}
                                            defaultValue={this.state.currDContact}
                                            size="large"
                                            prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                        >

                                        </Input>
                                    </Form.Item>
                    
                                    <Form.Item
                                        id = "currDAddr1"
                                        label="Address Line 1"
                                        name="currDAddr1"
                                        value={this.state.currDAddr1}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your address!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDAddr1}
                                            defaultValue={this.state.currDAddr1}
                                            size="large"
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDAddr2"
                                        label="Address Line 2"
                                        name="currDAddr2"
                                        value={this.state.currDAddr2}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your address!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDAddr2}
                                            defaultValue={this.state.currDAddr2}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDPostcode"
                                        label="Postcode"
                                        name="currDPostcode"
                                        value={this.state.currDPostcode}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your postcode!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDPostcode}
                                            defaultValue={this.state.currDPostcode}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                    
                                    <Form.Item
                                        id="currDRegion"
                                        label="Region"
                                        name="currDRegion"
                                        value={this.state.currDRegion}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your region!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDRegion}
                                            defaultValue={this.state.currDRegion}
                                            prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        id="currDCountry"
                                        label="Country"
                                        name="currDCountry"
                                        value={this.state.currDCountry}
                                        onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your country!'}]}
                                    >
                                        <Input 
                                            key= {this.state.currDCountry}
                                            defaultValue={this.state.currDCountry}
                                            prefix={<GlobalOutlined className="site-form-item-icon" />} 
                                            size="large"
                                        />
                                    </Form.Item>
                
                            </Modal>
                        </Form.Item>
                    </Form>
                </div>
                

                {/* Add New Address Component, triggle by click "add new address" in selection box */}
                <div style={{display:this.state.addAddr}}>
                    <Divider orientation="left">Add New Address</Divider>
                    <AddAddressForm customerCode={this.state.customerCode}></AddAddressForm>
                </div>
 
                {/* Todo: Billing Address Form */}
            </div>
        )
    }//end render

}//end class


export default withRouter(AddressesList)