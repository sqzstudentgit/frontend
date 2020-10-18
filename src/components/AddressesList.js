//ant design
import { Form, Input, Button, Card} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddressesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addresses:[]            
        }
    }

    _handleChange(e){

    }

    _handleSubmit(e){

    }

    addressList(){
        
    }

    render(){
        return(
            <Form>
                <Form.Item
                    name = "aDDRESS">

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