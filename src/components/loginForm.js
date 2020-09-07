import React from "react";
import axios from 'axios';
import ErrorMessage from './errorMessage'
import styled from 'styled-components';
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
        e.preventDefault();//test need
        
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

                }
            )
      
    }

    render() {
      if (!this.state.isLogout){
            this.state.isLogout = true
            return <Redirect to = {{ pathname: "/" }} />
        }  
        const {error, errorMassage} = this.state
        return (
            <div style={{width:'30%'}}>
                {error && <ErrorMessage massage={errorMassage}/>} 
               
                <StyledForm onSubmit={this._handleSubmit} className={this.props.className}>

                    
                    <Header>Welcome to SQUIZZ</Header>
                    <Fields>
                        <StyledInput>
                            {/* Change the icon in login page */}
                            <Icon  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png" />
                            <Inputbox type="text" value={this.state.username} id="username" onChange={this._handleChange} placeholder='Username' required={true}/>
                        </StyledInput>
                        

                        <StyledInput>
                            <Icon src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png" />
                            <Inputbox  type="password" value={this.state.password} id="password"  onChange={this._handleChange} placeholder='Password' required={true}/>

                        </StyledInput>
                        <SubmitField>
                        <StyledButton type="submit">Login</StyledButton>
                        </SubmitField>
                        
                        
                    </Fields>
                   
                </StyledForm>
            </div>

        )

    }
}

export default LoginForm


const Header = styled.div`
    color: black; // this is the color of the character at the top of the greeting box
    height: 60px;
    text-align: center;
    font-size: 16px;
`

const Fields = styled.div`
    height: fit-content;
    position: relative;
    left: 0;
    width:100%;
    box-shadow:rgba(48, 37, 52, 0.2);
`

const StyledInput = styled.div`
    position: relative;
    display: block;
    width:100%
`

const Inputbox = styled.input`
    color: black; // the color of input character
    width: 70%;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    background: inherit; // this is the color of the two input box: username and password, be consistent with the login box
    left: 10px;
    padding: 10px 65px;
    border-top: none;
    border-bottom: 0.5px solid #393d52;
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Arial', sans-serif;
    box-shadow: none;
`


const StyledForm = styled.form`
    opacity: 1;
    top: 20px;
    position: relative;
    width: fit-content;
    border-left-color:rgb(78, 81, 94);
    border-bottom-color:rgb(78, 81, 94);
    border-right-color:rgb(78, 81, 94);
    // border-top: 0.2px rgba(48, 37, 52, 0.2);
    // border-bottom: 0.2px rgba(48, 37, 52, 0.2);
    // border-left: 0.2px rgba(48, 37, 52, 0.2);
    // border-right: 0.2px rgba(48, 37, 52, 0.2);
    // box-shadow:rgba(48, 37, 52, 0.2);
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    height: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    padding: 100px 0px 8% 0px;
    background: white; // this is the color of the login box except the input box
    
    text-align: center;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#35394a', endColorstr='#1f222e',GradientType=1 );
    /* IE6-9 fallback on horizontal gradient */
    @media screen and (min-width: 1200px){
        width:25%;
        padding-bottom: 8%
}
`


const SubmitField = styled.div`
    position: relative;
    top: 35px;
    left: 0;
    width: 80%;
    right: 0;
    margin: auto;
    font-color: black;
`

const StyledButton = styled.button`
    border-radius: 50px;
    background: #f1f1f3; // the color of the round button
    padding: 10px 50px;
    border: 2px solid transparency; // the color of the edge of the button  
    text-transform: uppercase;
    font-size: 11px;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;

    &:hover {
        color: white;
        background: black; // the color of the background of button when clicking
        cursor: pointer;
        -webkit-transition-property: background,color;
        transition-property: background,color;
        -webkit-transition-duration: .2s;
                transition-duration: .2s;
    }

    &:focus{
        box-shadow: none;
        outline: none;
    }
`


const Icon = styled.img`
// the following URI is the icon of username and password which are white !
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
`