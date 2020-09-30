import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import ErrorMessage from './errorMessage'

import {withRouter, Redirect} from 'react-router-dom'

class SignUpForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            nickName:'',
            phone:'',
            email:'',
            password:'',
            card:'',
            billingAddress:'',
            deliveryAddress:'',
            details:'',

            error: false,
            errorMassage:'',
            //是否需要这个呢？一开始状态是true吗
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
                url: 'api/signup',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "nickName": this.state.nickName,
                    "phone": this.state.phone,
                    "email": this.state.email,
                    "password": this.state.password,
                    "card": this.state.card,
                    "billingAddress": this.state.billingAddress,
                    "deliveryAddress": this.state.deliveryAddress,
                    "details": this.state.details,    
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
        const {error, errorMassage} = this.state;
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div style={{display:'flex', alignItems: 'center', flexDirection:'column', marginTop:'10px'}}>
                    {/*LOGO图标*/} 
                    <Avatar style={{margin:'5px',backgroundColor:'#4169e1'}}>
                        <AccountCircleTwoToneIcon fontSize="large"/>
                    </Avatar>

                    {/*标题*/}
                    <Typography component="h1" variant="h5" style={{marginBottom:'20px'}}>
                        Create my account！
                    </Typography>

                    {/*正式Form*/}
                    <form style={{width:'100%'}}>
                        <Grid container spacing={3}> 
                    
                            {/*firstname*/}
                            <Grid item xs={2}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                            </Grid>

                            {/*lastname*/}
                            <Grid item xs={2}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                />  
                            </Grid>

                            {/*分割线*/}
                            <Grid item xs={1}>
                                <Divider orientation="vertical" variant="middle"/>
                            </Grid>

                            {/*card number*/}
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="card"
                                    label="Card Number"
                                    name="card"
                                    autoComplete="card"
                                    placeholder="Add your card."
                                />
                            </Grid>

                            {/*nickname*/}
                            <Grid item xs={2}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="nickName"
                                    label="Nick Name"
                                    name="nickName"
                                    autoComplete="nickName"
                                />
                            </Grid> 

                            {/*空格*/}
                            <Grid item xs={2}>
                            </Grid>
                            {/*分割线*/}
                            <Grid item xs={1}>
                                <Divider orientation="vertical" variant="middle"/>
                            </Grid>                           

                            {/*billing address*/}
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="billingAddress"
                                    label="Billing Address"
                                    name="billingAddress"
                                    autoComplete="billingAddress"
                                    placeholder="Enter a billing address."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/*phone number*/}
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    placeholder="XXXXXXXX"
                                />
                            </Grid>

                            {/*分割线*/}
                            <Grid item xs={1}>
                                <Divider orientation="vertical" variant="middle"/>
                            </Grid>

                            {/*delivery address*/}
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="deliveryAddress"
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    autoComplete="deliveryAddress"
                                    placeholder="Enter a delivery address."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/*email*/}
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="XXXXXXXX@XXXX.com"
                                    type="email"
                                />
                            </Grid>

                            {/*分割线*/}
                            <Grid item xs={1}>
                                <Divider orientation="vertical" variant="middle"/>
                            </Grid>

                            {/*details*/}
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="details"
                                    label="Squizz Organization Details"
                                    name="details"
                                    autoComplete="details"
                                />
                            </Grid>

                            {/*password*/}
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password."
                                />
                            </Grid>

                            {/*分割线*/}
                            <Grid item xs={1}>
                                <Divider orientation="vertical" variant="middle"/>
                            </Grid>

                            {/*勾选框*/}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>

                        {/*提交按钮*/}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{margin:"5px"}}
                        >
                            Create
                        </Button>

                        {/*跳转回login页面*/}
                        <Grid container justify="flex-end">
                            <Grid item>
                                    Already have an account?
                                <Link href="#" variant="body2">
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>

                    </form>          
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>                  
            </Container>
        )
        

    }
}

export default SignUpForm

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                COMP90082 Squizz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
