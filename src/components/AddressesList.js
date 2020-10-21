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

class AddressesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customerCode: '1', //Todo: test purpose, change to dynamic customer code in future
            
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

            addAddr:'none'
        }
        this._handleChange =  this._handleChange.bind(this)
    }

    _handleChange(e){
        console.log("Action:"+e);
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
                        addresses:this.state.addresses.concat(format_addr.slice(0, -2))
                    })
                }
                this.setState({
                    addressesJson:response.data,
                    currDeliveryAddr:this.state.addresses[0],
                    currDeliveryAddrJson:response.data[0],

                    currDContact:response.data[0].contact,
                    currDAddr1:response.data[0].address_line1,
                    currDAddr2:response.data[0].address_line2,
                    currDRegion:response.data[0].region,
                    currDCountry:response.data[0].country,
                    currDPostcode:response.data[0].postcode,
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
            }
        )
    }

    state = {
        loading: false,
        visible: false,
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = (e) => {
        this.setState({ loading: true });
        axios({
                method: 'post',           
                url: 'api/',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                      "address": {
                                  "contact": this.state.contact,
                                  "address_line1": this.state.addr1,
                                  "address_line2": this.state.addr2,
                                  "postcode": this.state.postcode,
                                  "region": this.state.region,
                                  "country": this.state.country
                              }
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
                        visible: false 
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
        this.setState({ visible: false });
      };
    
    render(){

        console.log("Page Start")

        const { visible, loading } = this.state;
        const addressesList = [];


        for(let i=0; i<this.state.addresses.length; i++){
            addressesList.push(<Option key={i}>{this.state.addresses[i]}</Option>)
        }
        addressesList.push(<Option key="-1">Add New Address</Option>);

        const { Text } = Typography;

        //const formatDeliveryAddr = this.state.currDeliveryAddr.split(";").map(addr => <p>{addr}</p>);

        return(
            <div>
                {/* Delivery Address Form */}
                <div>
                    <Divider orientation="left">Delivery Address</Divider>
                    <Form>
                        <Form.Item>
                            <Select
                                placeholder="Select/Add Delivery Address"
                                onChange={this._handleChange}
                            >
                                {addressesList}
                            </Select>
                        </Form.Item>

                        {/* Display Current Delivery Address */}
                        <Form.Item>
                            <div style={{lineHeight: '8px'}}>
                                {/* {formatDeliveryAddr} */}
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currDAddr1}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currDAddr2}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.currDRegion}, {this.state.currDCountry}, {this.state.currDPostcode}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;Contact:    {this.state.currDContact}</p>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button type="link" onClick={this.showModal}>
                                Edit this address
                            </Button>

                            <Modal
                                title="Edit Address"
                                visible={visible}
                                onOk={this.handleOK}
                                onCancel={this.handleCancel}
                                onChange={this._handleChange}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                    Return
                                    </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                    Save Changes
                                    </Button>,
                                ]}
                            >
                                    <Form.Item
                                        label="Contact"
                                        name="contact"
                                        //value={this.state.contact}
                                        //onChange={this._handleChange}
                                        rules={[{required: true,message: 'Please input your contact!'}]}
                                    >
                                        <Input 
                                            value={this.state.contact}
                                            onChange={this._handleChange}
                                            key= {this.state.currDContact}
                                            defaultValue={this.state.currDContact}
                                            size="large"
                                            prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                        >

                                        </Input>
                                    </Form.Item>
                    
                                    <Form.Item
                                        label="Address Line 1"
                                        name="addr1"
                                        value={this.state.addr1}
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
                                        label="Address Line 2"
                                        name="addr2"
                                        value={this.state.addr2}
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
                                        label="Postcode"
                                        name="postcode"
                                        value={this.state.postcode}
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
                                        label="Region"
                                        name="region"
                                        value={this.state.region}
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
                                        label="Country"
                                        name="country"
                                        value={this.state.country}
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