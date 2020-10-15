//ant design
import { Form, Input, Button, Card} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddressForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addr1:"test1",
            addr2:"test2",
            state:"state1"
            
        }
    }

    _handleChange(e){

    }

    _handleSubmit(e){

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

export default withRouter(AddressForm)