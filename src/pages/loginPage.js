import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import LoginForm from '../components/loginForm'
import styled from 'styled-components';

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
   
    }

    render() {
        return (

            <Page>
                    <div>
                        {/*<Loginform>*/}
                        <LoginForm />
                        {/*</Loginform>*/}
                    </div>
                    
            </Page>

        )

    }
}

export default withRouter(LoginPage)

const Page = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
    // background: white;
    height: 100%
`

// const Loginform = styled.LoginForm`
//     background-color = lightgrey;
// `

const Logo = styled.img`
    max-width: 30%;
    max-height: 100%;
`