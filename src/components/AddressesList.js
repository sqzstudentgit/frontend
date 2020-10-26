//ant design
import { Form, Input, Button, Select, Divider,Modal} from 'antd';
import {message as antdMessage} from 'antd' ;
import { GlobalOutlined, EnvironmentOutlined, PhoneOutlined} from '@ant-design/icons';

//React
import React, {useEffect, useState, useReducer} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

//Linked Components
import AddAddressForm from '../components/AddAddressForm';
import { IdBadge } from 'styled-icons/fa-regular';
import { format } from 'path';

const AddressesList = ({ props } ) => {
    const [loading, setLoading] = useState(false);
    const [dvisible, setDvisible] = useState(false);
    const [bvisible, setBvisible] = useState(false);

    const initialState = {
        customerId: '', //dynamic customer code in future
    
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

    const reducer = (state, newState) => ({ ...state, ...newState })
    const [state, setState] = useReducer(reducer, initialState);

    const { customerId } = useStoreState(state => ({
        customerId: state.customer.customerId,
      }))

    const { 
        //List of all addresses for the customer
        addresses,       //all addresses are formatted into string, seperate by ";"
        addressesJson,   //all addresses are in JSON formats
    
        //Delivery Address
        currDeliveryAddrJson,
        currDContact,
        currDAddr1,
        currDAddr2,
        currDRegion,
        currDCountry,
        currDPostcode,
    
        //Billing Address
        currBillAddrJson,
        currBContact,
        currBAddr1,
        currBAddr2,
        currBRegion,
        currBCountry,
        currBPostcode,

        addAddr,
        } = state;
    

    useEffect(() => {
        axios
            .get("api/customer/"+customerId+"/addresses")
            .then(res => {
                    console.log(res);              
                    for(let i=0; i<res.data.length; i++){
                        var temp_addr=JSON.parse(JSON.stringify(res.data[i]));
                        var format_addr="";
                        for (var x in temp_addr){
                            if (x!=='id' && x!=='customer_id' && temp_addr[x]!==null){
                                format_addr += temp_addr[x]+"; "
                            }
                        }                       
                        addresses[i] = format_addr.slice(0, -2);
                        addressesJson[i] = temp_addr;
                    }

                    updateDeliveryAddrDetail(0);
                    updateBillAddrDetail(0);
            })
            .catch(err => console.log(err));
    }, []);

    
    function updateAddresses(){
        axios
        .get("api/customer/"+customerId+"/addresses")
        .then(res => {
                console.log(res);              
                for(let i=0; i<res.data.length; i++){
                    var temp_addr=JSON.parse(JSON.stringify(res.data[i]));
                    var format_addr="";
                    for (var x in temp_addr){
                        if (x!=='id' && x!=='customer_id' && temp_addr[x]!==null){
                            format_addr += temp_addr[x]+"; "
                        }
                    }                       
                    addresses[i] = format_addr.slice(0, -2);
                    addressesJson[i] = temp_addr;
                }
            },
            setState({addAddr:'none'}))
        .catch(err => console.log(err));
    }

    function updateDeliveryAddrDetail(idx){
        setState({
            currDeliveryAddrJson:addressesJson[idx],
            currDContact:addressesJson[idx].contact,
            currDAddr1:addressesJson[idx].address_line1,
            currDAddr2:addressesJson[idx].address_line2,
            currDRegion:addressesJson[idx].region,
            currDCountry:addressesJson[idx].country,
            currDPostcode:addressesJson[idx].postcode
        })
    }

    function updateBillAddrDetail(idx){
        setState({
            currBillAddrJson:addressesJson[idx],
            currBContact:addressesJson[idx].contact,
            currBAddr1:addressesJson[idx].address_line1,
            currBAddr2:addressesJson[idx].address_line2,
            currBRegion:addressesJson[idx].region,
            currBCountry:addressesJson[idx].country,
            currBPostcode:addressesJson[idx].postcode,
        })
    }

    /**
     * Construct address list in selection box
     */
    const addressesList = [];
    for(let i=0; i<addresses.length; i++){
        addressesList.push(<Select.Option key={i}>{addresses[i]}</Select.Option>)
    }
    addressesList.push(<Select.Option key="-1">Add New Address</Select.Option>);


    const handleDAddrChange = (e) => {
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            setState({addAddr:''})
        }else{
            updateDeliveryAddrDetail(e);
            setState({addAddr:'none'})
        }
    }

    const handleBAddrChange = (e) => {
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            setState({addAddr:''})
        }else{
            updateBillAddrDetail(e);
            setState({addAddr:'none'})
        }
    }

    const _handleChange = (e) => {
        let id = e.target.id
        setState({
            [id]: e.target.value
        })
    }
    
    const showModal = () => {
        setDvisible(true);
      };

    const handleEditOk = (e) => {
        setLoading(true);
        // Edit Existing Address
        axios({
                method: 'put',           
                url: '/api/customer/'+customerId+'/addresses/'+currDeliveryAddrJson.id,
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                "contact": currDContact,
                "address_line1": currDAddr1,
                "address_line2": currDAddr2,
                "postcode": currDPostcode,
                "region": currDRegion,
                "country": currDCountry
                }
            })
            .then(
                (response)=>{
                    console.log(response);                  
                    setState({error:false});
                    updateAddresses();
                    setLoading(false); 
                    setDvisible(false);
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    setState({
                        error:true,
                        errorMassage: e.response.data.message
                    })
                    antdMessage.info(errorMassage);
                }
            )
    };

    const handleCancel = () => {
        setDvisible(false);
      };

    /**
     * Billing Address Handeler
     */
    const showBModal = () => {
        setBvisible(true);
      };

    const handleBEditOk = (e) => {
        setLoading(true);
        // Add modified new address
        axios({
                method: 'put',           
                url: '/api/customer/'+customerId+'/addresses/'+currBillAddrJson.id,
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                "contact": currBContact,
                "address_line1": currBAddr1,
                "address_line2": currBAddr2,
                "postcode": currBPostcode,
                "region": currBRegion,
                "country": currBCountry
                }
            })
            .then(
                (response)=>{
                    console.log("Edit Address Success!");
                    console.log(response);                  
                    setState({error:false});
                    setLoading(false); 
                    setDvisible(false);
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    setState({
                        error:true,
                        errorMassage: e.response.data.message
                    })
                    antdMessage.info(errorMassage);
                }
            )     
        };
    
      const handleBCancel = () => {
        setBvisible(false);
      };
    
      

    return(
        <div>
            {/* Delivery Address Form */}
            <div>
                <Divider orientation="left">Delivery Address</Divider>
                <Form>
                    <Form.Item>
                        <Select
                            placeholder="Select/Add Delivery Address"
                            onChange={handleDAddrChange}
                        >
                            {addressesList}
                        </Select>
                    </Form.Item>

                    {/* Display Current Delivery Address */}
                    <Form.Item>
                        <div style={{lineHeight: '8px', marginLeft:'16px'}}>
                            <p>{currDAddr1}</p>
                            <p>{currDAddr2}</p>
                            <p>{currDRegion}, {currDCountry}, {currDPostcode}</p>
                            <p>Contact:    {currDContact}</p>
                        </div>
                        <Button type="link" onClick={showModal}>
                            Edit this address
                        </Button>
                    </Form.Item>

                    {/* Edit Address Form */}
                    <Modal
                        title="Edit Address"
                        visible={dvisible}
                        onOk={handleEditOk}
                        onCancel={handleCancel}
                        onChange={_handleChange}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                            Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleEditOk}>
                            Save Changes
                            </Button>,
                        ]}
                    >
                            <Form.Item
                                id="currDContact"
                                label="Contact"
                                name="currDContact"
                                value={currDContact}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your contact!'}]}
                            >
                                <Input
                                    key= {currDContact}
                                    defaultValue={currDContact}
                                    prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                >
                                </Input>
                            </Form.Item>
            
                            <Form.Item
                                id = "currDAddr1"
                                label="Address Line 1"
                                name="currDAddr1"
                                value={currDAddr1}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your address!'}]}
                            >
                                <Input 
                                    key= {currDAddr1}
                                    defaultValue={currDAddr1}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currDAddr2"
                                label="Address Line 2"
                                name="currDAddr2"
                                value={currDAddr2}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your address!'}]}
                            >
                                <Input 
                                    key= {currDAddr2}
                                    defaultValue={currDAddr2}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currDPostcode"
                                label="Postcode"
                                name="currDPostcode"
                                value={currDPostcode}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your postcode!'}]}
                            >
                                <Input 
                                    key= {currDPostcode}
                                    defaultValue={currDPostcode}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currDRegion"
                                label="Region"
                                name="currDRegion"
                                value={currDRegion}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your region!'}]}
                            >
                                <Input 
                                    key= {currDRegion}
                                    defaultValue={currDRegion}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
                            
                            <Form.Item
                                id="currDCountry"
                                label="Country"
                                name="currDCountry"
                                value={currDCountry}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your country!'}]}
                            >
                                <Input 
                                    key= {currDCountry}
                                    defaultValue={currDCountry}
                                    prefix={<GlobalOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
        
                    </Modal>
                </Form>
            </div>
            

            <div>
                <Divider orientation="left">Billing Address</Divider>
                <Form>
                    <Form.Item>
                        <Select
                            placeholder="Select/Add Delivery Address"
                            onChange={handleBAddrChange}
                        >
                            {addressesList}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div style={{lineHeight: '8px', marginLeft:'16px'}}>
                            <p>{currBAddr1}</p>
                            <p>{currBAddr2}</p>
                            <p>{currBRegion}, {currBCountry}, {currBPostcode}</p>
                            <p>Contact:    {currBContact}</p>
                        </div>
                        <Button type="link" onClick={showBModal}>
                                Edit this address
                        </Button>
                    </Form.Item>

                    {/* Edit Address Form */}
                    <Modal
                        title="Edit Address"
                        visible={bvisible}
                        onOk={handleBEditOk}
                        onCancel={handleBCancel}
                        onChange={_handleChange}
                        footer={[
                            <Button key="back" onClick={handleBCancel}>
                            Return
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleBEditOk}>
                            Save Changes
                            </Button>,
                        ]}
                    >
                            <Form.Item
                                id="currBContact"
                                label="Contact"
                                name="currBContact"
                                value={currBContact}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your contact!'}]}
                            >
                                <Input 
                                    key={currBContact}
                                    defaultValue={currBContact}
                                    prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                >

                                </Input>
                            </Form.Item>
            
                            <Form.Item
                                id = "currBAddr1"
                                label="Address Line 1"
                                name="currBAddr1"
                                value={currBAddr1}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your address!'}]}
                            >
                                <Input 
                                    key= {currBAddr1}
                                    defaultValue={currBAddr1}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currBAddr2"
                                label="Address Line 2"
                                name="currBAddr2"
                                value={currBAddr2}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your address!'}]}
                            >
                                <Input 
                                    key= {currBAddr2}
                                    defaultValue={currBAddr2}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currBPostcode"
                                label="Postcode"
                                name="currBPostcode"
                                value={currBPostcode}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your postcode!'}]}
                            >
                                <Input 
                                    key= {currBPostcode}
                                    defaultValue={currBPostcode}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
            
                            <Form.Item
                                id="currBRegion"
                                label="Region"
                                name="currBRegion"
                                value={currBRegion}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your region!'}]}
                            >
                                <Input 
                                    key= {currBRegion}
                                    defaultValue={currBRegion}
                                    prefix={<EnvironmentOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
                            
                            <Form.Item
                                id="currBCountry"
                                label="Country"
                                name="currBCountry"
                                value={currBCountry}
                                onChange={_handleChange}
                                rules={[{required: true,message: 'Please input your country!'}]}
                            >
                                <Input
                                    key= {currBCountry}
                                    defaultValue={currBCountry}
                                    prefix={<GlobalOutlined className="site-form-item-icon" />} 
                                />
                            </Form.Item>
                    </Modal>
                </Form>
            </div>


            {/* Add New Address Component, triggle by click "add new address" in selection box */}
            <div style={{display:addAddr}}>
                <Divider orientation="left">Add New Address</Divider>
                <AddAddressForm customerId={customerId} updateAddresses={updateAddresses}></AddAddressForm>
            </div>

        </div>
    )
}


export default withRouter(AddressesList)