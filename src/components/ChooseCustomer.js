import React from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Card, Form, List } from 'antd';
import 'antd/dist/antd.css';

class ChooseCustomer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            redirect: false
        }
    }

    // get all customers info
    componentDidMount() {
        axios({
                method: 'get',           
                url: 'api/customers',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                
            }              
        )
            .then(
                (response)=>{
                    console.log("Get category list");
                    console.log(response.data);
                    this.setState({
                        users: response.data,
                    });
                }
            )
            .catch(function (error) {
                console.log(error);
            })    
    }

    //Click on a customer code, its infomation will be return
    //This still will be update since each customer has different url
    getCustomer = (name, e) => {
        console.log(name);
        this.setState({
            redirect: true,
        });
    }

    render() {
        if (this.state.redirect === true){
            return <Redirect to = {{ pathname: "/" }} />
        }
        
        return (
            <Card bordered={false} style={{ width: 300 }} cover={<img alt="example" src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg" />}>
                <Form
                className="chooseCustomer-form"
                initialValues={{remember: true}}
                >   
                    <List
                        dataSource={this.state.users}
                        renderItem={item => 
                            <List.Item>
                                <Button type="primary" className="customer-button" block onClick={this.getCustomer.bind(this, item.id)}>
                                    {item.customer_code}
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