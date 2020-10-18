//ant design
import { Form, Input, Button, Card, Select} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddressesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customerCode: 11, //Todo: test purpose, change to dynamic customer code in future
            addresses:[],
            
            currDeliveryAddr:'',
            dcontact:'',
            daddr1:'',
            daddr2:'',
            //Todo: Add more value later


            error:false,
            errorMessage:''
        }
        this._handleChange =  this._handleChange.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }

    _handleChange(e){
        this.setState({
            currDeliveryAddr:e
        })
    }

    _handleSubmit(e){

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
                // Reformat the address information so that if fits the selection box
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

    updateAddress(e){
        
    }

    render(){
        console.log("Page Start")
        console.log(this.state.currDeliveryAddr)

        const addressesList = [];
        for(let i=0; i<this.state.addresses.length; i++){
            addressesList.push(<Option key={this.state.addresses[i]}>{this.state.addresses[i]}</Option>)
        }

        const { Text } = Typography;

        return(
            <Form>
                <Form.Item>
                    Delivery Address: 
                    {this.state.currDeliveryAddr}
                </Form.Item>

                <Form.Item>
                    <Select
                        defaultValue={this.state.currDeliveryAddr}
                        onChange={this._handleChange}
                    >
                        {addressesList}
                    </Select>
                </Form.Item>
            </Form>
            
        )
    }

}

// Mock parameter data for address
const addressDataSource = {
    "addr1":"test1",
    "addr2":"test2"
    }

export default withRouter(AddressesList)