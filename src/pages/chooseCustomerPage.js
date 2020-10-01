import React from "react";
import { Route } from 'react-router-dom';
import ChooseCustomer from '../components/ChooseCustomer';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class ChooseCustomerPage extends React.Component{
    state = {
        customers: [
            {
                id: "no1",
                name: "customer1"
            },
            {
                id: "no2",
                name: "customer2"       
            },
            {
                id: "no3",
                name: "customer3"
            }
        ]
    }

    render() {
        return (
            <Row style={{ height:  "100%"}} justify="space-around" align="middle">
                <Col>
                <ChooseCustomer customers={this.state.customers} />
                </Col>
            </Row>
        )
        //window.history.back(-1)
        this.props.history.push('/login')
        //console.log(this.props.history)
        return 'error?'
    }
}

export default withRouter(ChooseCustomerPage);