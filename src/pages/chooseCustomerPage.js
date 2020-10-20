import React from "react";
import { Route } from 'react-router-dom';
import ChooseCustomer from '../components/ChooseCustomer';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class ChooseCustomerPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }   
    }

    render() {
        return (
            <Row style={{ height:  "100%"}} justify="space-around" align="middle">
                <Col>
                    <ChooseCustomer />
                </Col>
            </Row>
        )
    }
}

export default withRouter(ChooseCustomerPage);