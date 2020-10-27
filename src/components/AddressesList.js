//ant design
import { Form, Button, Select, Divider} from 'antd';

//React
import React, {useEffect, useState, useReducer} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

//Linked Components
import AddAddressForm from '../components/AddAddressForm';
import EditAddressForm from '../components/EditAddressForm';

const AddressesList = ( ) => {
    const [dvisible, setDvisible] = useState(false);
    const [bvisible, setBvisible] = useState(false);
    const [addAddr, setAddAddr] = useState("none");

    /**
     * Initial State for AddressList
     */
    const initialState = {
        customerId: '', //dynamic customer code

        addresses:[],       //all addresses are formatted into string, seperate by ";"
        addressesJson:[],   //all addresses are in JSON formats

        currDeliveryAddrJson:'',
        currBillAddrJson:'',
    }

    const reducer = (state, newState) => ({ ...state, ...newState })
    const [state, setState] = useReducer(reducer, initialState);

    const { 
        addresses,       //all addresses are formatted into string, seperate by ";"
        addressesJson,   //all addresses are in JSON formats
        
        currDeliveryAddrJson,
        currBillAddrJson,
        } = state;


    /**
     * Global Customer & Address Information
     */
    const { customerId } = useStoreState(state => ({
        customerId: state.customer.customerId
      }))
    
    const { setDeliveryAddrId, setBillingAddrId } = useStoreActions(actions => ({
        setDeliveryAddrId: actions.customer.setDeliveryAddrId,
        setBillingAddrId: actions.customer.setBillingAddrId
    }))


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

                    setState({
                        currDeliveryAddrJson:addressesJson[0],
                        currBillAddrJson:addressesJson[0]
                    })

                    //Set Global State
                    setDeliveryAddrId(addressesJson[0].id);
                    setBillingAddrId(addressesJson[0].id);
            })
            .catch(err => console.log(err));
    }, []);

    
    /**
     * Grab new address informations and update addresses & addressesJson
     */
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
            setAddAddr('none')
            )
        .catch(err => console.log(err));
    }

    /**
     * Handeler for Delivery Address selection box
     * @param {*} e 
     */
    const handleDAddrChange = (e) => {
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            setAddAddr('')
        }else{
            setState({currDeliveryAddrJson:addressesJson[e]})
            setAddAddr('none');
            setDeliveryAddrId(addressesJson[e].id);
        }
    }

    /**
     * Handeler for Billing Address selection box
     * @param {*} e 
     */
    const handleBAddrChange = (e) => {
        if(e==="-1"){ //if user want to add new address, pop up the AddAddressForm
            setAddAddr('')
        }else{
            setState({currBillAddrJson:addressesJson[e]})
            setAddAddr('none');
            setBillingAddrId(addressesJson[e].id);
        }
    }
    
    /**
     * Handeler for Delivery Address edit form
     */
    const handleCancel = () => {
        setDvisible(false);
        updateAddresses();
    };
    
    /**
     * Handeler for Billing Address edit form
     */
    const handleBCancel = () => {
        setBvisible(false);
        updateAddresses();
    };

    /**
     * Construct address list in selection box
     */
    const addressesList = [];
    for(let i=0; i<addresses.length; i++){
        addressesList.push(<Select.Option key={i}>{addresses[i]}</Select.Option>)
    }
    addressesList.push(<Select.Option key="-1">Add New Address</Select.Option>);

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
                            <p>{currDeliveryAddrJson.address_line1}</p>
                            <p>{currDeliveryAddrJson.address_line2}</p>
                            <p>{currDeliveryAddrJson.region}, {currDeliveryAddrJson.country}, {currDeliveryAddrJson.postcode}</p>
                            <p>Contact:    {currDeliveryAddrJson.contact}</p>
                        </div>
                        <Button type="link" onClick={()=>setDvisible(true)}>
                            Edit this address
                        </Button>
                    </Form.Item>

                    {/* Edit Address Form */}
                    {dvisible ? (
                        <EditAddressForm address={currDeliveryAddrJson} handleCancel={handleCancel}></EditAddressForm>
                    ):(null)}
                </Form>
            </div>
            

            {/* Billing Address Form */}
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
                    
                    {/* Display Current Billing Address */}
                    <Form.Item>
                        <div style={{lineHeight: '8px', marginLeft:'16px'}}>
                            <p>{currBillAddrJson.address_line1}</p>
                            <p>{currBillAddrJson.address_line2}</p>
                            <p>{currBillAddrJson.region}, {currBillAddrJson.country}, {currBillAddrJson.postcode}</p>
                            <p>Contact:    {currBillAddrJson.contact}</p>
                        </div>
                        <Button type="link" onClick={()=>setBvisible(true)}>
                                Edit this address
                        </Button>
                    </Form.Item>
                    
                    {/* Edit Address Form */}
                    {bvisible ? (
                        <EditAddressForm address={currBillAddrJson} handleCancel={handleBCancel}></EditAddressForm>
                    ):(null)}
                    
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