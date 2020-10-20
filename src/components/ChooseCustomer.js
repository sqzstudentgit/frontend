import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Card, Image, Form,List,Typography, Divider } from 'antd';
import 'antd/dist/antd.css';
import DataTable from './DataTable';

class ChooseCustomer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        Axios({
                method: 'get',           
                url: 'api/customers',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                
            }              
        )
            .then(
                (response)=>{
                    console.log("Get Customer Success!");
                    console.log(response.data);
                    this.setState({
                        users: response.data
                    });
                }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.users.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <Card bordered={false} style={{ width: 300 }} cover={<img alt="example" src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg" />}>
                <Form
                className="chooseCustomer-form"
                initialValues={{remember: true}}
                >   
                    <List
                        dataSource={this.dataTable()}
                        renderItem={item => <List.Item>
                            <Button type="primary" htmlType="submit" className="customer-button" block>
                                {item}
                            </Button>
                        </List.Item>}
                    />
                    <Button type="link" block href='/create'>
                        Create a customer account
                    </Button>

                </Form>

            </Card>
        )
    }
}


export default ChooseCustomer