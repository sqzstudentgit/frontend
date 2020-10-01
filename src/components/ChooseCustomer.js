import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Card, Image, Form } from 'antd';
import 'antd/dist/antd.css';

class ChooseCustomer extends React.Component{

    render() {
        return (
            <Card bordered={false} style={{ width: 300 }} cover={<img alt="example" src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg" />}>
                <Form
                className="chooseCustomer-form"
                initialValues={{remember: true}}
                >
                    {this.props.customers.map((customer) => (//retrieve the customer list
                        <Form.Item style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit" className="customer-button">
                                {customer.name}
                            </Button>
                        </Form.Item>
                    //pagination function will be added
                    ))}

                    <Button type="link" block>
                        Create a customer account
                    </Button>

                </Form>

            </Card>
        )
    }
}


export default ChooseCustomer