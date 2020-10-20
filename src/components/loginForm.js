//ant design
import { Form, Input, Button, Card} from 'antd';
import {message as antdMessage} from 'antd' ;
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//React
import React from "react";
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'



class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            error: false,
            errorMassage:'',
            isLogout:true
        }
        this._handleChange =  this._handleChange.bind(this)
        this._handleSubmit =  this._handleSubmit.bind(this)
    }


    _handleChange(e){
        let id = e.target.id
        this.setState({
            [id]: e.target.value
        })
    }


    _handleSubmit(e){
        // e.preventDefault();//test need
        
       axios({
                method: 'post',           
                url: 'api/login',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "username": this.state.username,
                    "password": this.state.password,
                }
            }
            )
            .then(
                (response)=>{
                    console.log(response);
                    let {status, message} = response.data;
                    let {session_id} = response.data.data;
                    console.log(message);
                    //alert(message);
                    if(status=="success"){
                        sessionStorage.setItem('user', this.state.username);
                        sessionStorage.setItem('sessionKey', session_id);
                        this.setState({
                            error:false,
                            isLogout:false
                        })
                    }
                    else{
                        this.setState({
                            error:true,
                            errorMassage:"Sorry, your username and/or password are incorrect. Please try again."
                        })
                        antdMessage.info(this.state.errorMassage);
                    } 
                }
            )
            .catch(
                (e)=>{
                    console.log(e)
                    this.setState({
                        error:true,
                        errorMassage: e.response.data
                    })
                    antdMessage.info(this.state.errorMassage);
                }
            )
    }//end _handleSubmit


    render() {
        if (!this.state.isLogout){
            this.state.isLogout = true
            return <Redirect to = {{ pathname: "/choose" }} />
        }//end if
        
        return (
            <Card  bordered={false} style={{ width: 300 }} cover={<img alt="example" src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg" />}>
                
                <Form
                className="login-form"
                initialValues={{remember: true}}
                onFinish={this._handleSubmit}
                >
    
                    <Form.Item
                        name="username"
                        value={this.state.username}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your username!'}]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username" 
                        />
                    </Form.Item>
            
                    <Form.Item
                        name="password"
                        value={this.state.password}
                        onChange={this._handleChange}
                        rules={[{required: true,message: 'Please input your password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
            
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            
        )//end return
    }//end render
}

export default LoginForm