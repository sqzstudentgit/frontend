//ant design
import { Form, Input, Button, Card} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'

class AddAddressForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            contact:'',
            addr1:'',
            addr2:'',
            postcode:'',
            region:'',
            country:''
        }
    }

    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }

    _handleSubmit(e){
        console.log("address saved")
    }

    render(){
        return(
            <Form>
                <Form.Item
                name="contact"
                label="Contact"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                name="addr1"
                label="Address1"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                <Input style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        )
    }


}//end AddAddressForm

export default AddAddressForm