import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Card, Form, List, Spin, Alert } from 'antd';


import { useStoreState, useStoreActions } from 'easy-peasy';



const ChooseCustomer = () => {
    const [users, setUsers] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const { customerId } = useStoreState(state => ({
        customerId: state.customer.customerId
      }))
    
      // Global cart actions
    const { setCustomerId, removeCustomerId } = useStoreActions(actions => ({
        setCustomerId: actions.customer.setCustomerId,
        removeCustomerId: actions.customer.removeCustomerId,
      }))
    
    let isRendered = useRef(false);
    useEffect(() => {
        isRendered = true;
        axios
            .get("api/customers")
            .then(res => {
                if (isRendered) {
                    console.log(res.data);
                    setUsers(res.data);
                }
                return null
            })
            .catch(err => console.log(err));
        return () => {
            isRendered = false;
        };
    }, []);

    if (redirect === true){
        return <Redirect to = {{ pathname: "/" }} />
    }
    
    const onSelect = (item) =>{
        const custid = item.id

        // update customerid in state
        setCustomerId(custid);

        console.log(custid);

        setLoading(true);
        // update product with new customerid
        const response = axios.post('/api/switch_customer',{
            customer_id: custid,
        }).then(res=>{
            console.log(res.data.message)
        }).catch (err=>{
            console.log(err);
        })
        setLoading(false);

        setRedirect(true)
    }

    return (
        <>
            {loading ? (
                <Spin tip="Loading...">
                <Alert
                message="Welcome"
                description="Loading for products..."
                type="info"
                />
                </Spin>
            ) : (
                null
            )}
            <br/>
            <Card bordered={false} style={{ width: 300 }} cover={<img alt="example" src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg" />}>
                <Form
                className="chooseCustomer-form"
                initialValues={{remember: true}}
                >   
                    <List
                        dataSource={users}
                        renderItem={item => 
                            <List.Item>
                                <Button type="primary" className="customer-button" block onClick={() => onSelect(item)}>
                                    {item.customer_code}
                                </Button>
                            </List.Item>}
                    />
                    <Button type="link" block href='/create'>
                        Create a customer account
                    </Button>

                </Form>
                            
            </Card>

        </>
    )
}

export default withRouter(ChooseCustomer)