//ant design
import { Row, Col } from 'antd';

//react
import React from "react";
import {withRouter} from 'react-router-dom'
import LoginForm from '../components/loginForm'

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
   
    }

    render() {
        return (
            <Row style={{ height:  "100%"}} justify="space-around" align="middle">
                <Col>
                <LoginForm/>
                </Col>
            </Row>
        )//end return
    }
}

export default withRouter(LoginPage)
