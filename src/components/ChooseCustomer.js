import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import styled from 'styled-components';
import {withRouter, Redirect} from 'react-router-dom'

class ChooseCustomer extends React.Component{

    render() {
        return (
            <StyledForm className='customer-list'>
                <Header>
                    Please choose a customer
                </Header>
                {this.props.customers.map((customer) => (
                    <StyledInput key={customer.id} className='customer-list-item'>
                        <StyledButton className='customer-details'>
                            {customer.name}
                        </StyledButton>
                    </StyledInput>
                ))}
                <SubmitField>
                    <Link to='/createcustomer' className='createcustomer'>
                        <StyledButton className='create'>
                            Create a new customer
                        </StyledButton>
                    </Link>
                </SubmitField>
            </StyledForm>

        )
    }
}


export default ChooseCustomer

const StyledForm = styled.form`
    opacity: 1;
    top: 20px;
    position: relative;
    width: fit-content;
    border-left-color:rgb(78, 81, 94);
    border-bottom-color:rgb(78, 81, 94);
    border-right-color:rgb(78, 81, 94);
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
    border-radius: 10px;

    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#35394a', endColorstr='#1f222e',GradientType=1 );
    /* IE6-9 fallback on horizontal gradient */
    @media screen and (min-width: 1200px){
        width:35%;
        padding-bottom: 8%
}
`

const Header = styled.div`
    color: black; // this is the color of the character at the top of the greeting box
    height: 80px;
    text-align: center;
    font-size: 26px;
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
    border: 10px solid transparency; // the color of the edge of the button  
    text-transform: uppercase;
    font-size: 10px;
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

const StyledInput = styled.div`
    position: relative;
    display: block;
    width:100%;
    font-size: 20px;
    padding: 10px 50px;
`