//ant design
import { Form, Input, Button, Card, Select, Row, Col, Divider} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
            customerCode: 11, //Todo: test purpose, change to dynamic customer code in future
            
            //List of all addresses for the customer
            addresses:[],       //all addresses are formatted into string, seperate by ";"
            addressesJson:[],   //all addresses are in JSON formats

            //Delivery Address
            currDeliveryAddr:'',
            currDeliveryAddrJson:'',

            currBillAddr:'',
            currBillAddrJson:'',

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
                addAddr:'none'
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
                    var temp_addr=JSON.parse(response.data[i]);
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
                    currDeliveryAddrJson:response.data[0]
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



    render(){

        console.log("Page Start")
        
        const addressesList = [];
        for(let i=0; i<this.state.addresses.length; i++){
            addressesList.push(<Option key={i}>{this.state.addresses[i]}</Option>)
        }
        addressesList.push(<Option key="-1">Add New Address</Option>);

        const { Text } = Typography;

        const formatDeliveryAddr = this.state.currDeliveryAddr.split(";").map(addr => <p>{addr}</p>);

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
                                {formatDeliveryAddr}
                            </div>
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