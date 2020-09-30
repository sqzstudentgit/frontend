import React from "react";
import { Route } from 'react-router-dom';
import ChooseCustomer from '../components/ChooseCustomer';

import axios from 'axios';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';

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
            <div>
                <ChooseCustomer customers={this.state.customers} />
            </div>
        )
        //window.history.back(-1)
        this.props.history.push('/login')
        //console.log(this.props.history)
        return 'error?'
    }
}

export default withRouter(ChooseCustomerPage);