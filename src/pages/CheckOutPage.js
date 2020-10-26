import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import { search } from '../utils/search';
import TallCartProduct from '../components/TallCartProduct';
import ShortCartProduct from '../components/ShortCartProduct';
import NavigationBar from '../components/NavigationBar';

// Todo: This is the temp design for Checkout - Add Billing Address & Delivery Address function
import AddAddressForm from '../components/AddAddressForm';
import AddressesList from '../components/AddressesList'

// Ant Design Components
import {
    Affix,
    Alert,
    AutoComplete,
    Button,
    Card,
    Col,
    Form,
    Input,
    Layout,
    notification,
    Radio,
    Row,
    Statistic,
  } from 'antd';

/**
 * This page is responsible for user:
 *      1. select delivery & billing address
 *      2. edit&add delivery & billing address
 *      3. check out
 */

const CheckOutPage = ({ history }) =>{
    // General page state
  const [submitLoading, setSubmitLoading] = useState(false);  // Order submission loading state


    // Global customer & cart state
    const { customerId, products, totalPrice } = useStoreState(state => ({
        customerId: state.customer.customerId,
        products: state.cart.products,
        totalPrice: state.cart.totalPrice
    }))

    const returnCart = () =>{
        history.push('/order');
      }
    /**
     * Handles submission of an order to the backend API endpoint
     */
    const handleSubmit = async () => {
        // First, check if the cart is empty
        if (products.length == 0) {
        notification.warning({
            message: 'Your cart is empty',
            description: 'Please add a product to your cart before submitting an order'
        })
        return;
        }

        // Map products in the cart to 'lines' (i.e. order details)
        let lines = products.map(product => ({
        ...product,
        lineType: "PRODUCT",
        unitPrice: product.price,
        totalPrice: product.price * product.quantity,
        priceTotalExTax: product.price * product.quantity
        }))

        // Submit the order to the backend API endpoint
        try {
        setSubmitLoading(true);
        console.log(lines)
        const response = await axios.post('/api/purchase', {
            lines: lines,
            sessionKey: sessionStorage.getItem('sessionKey')
        }, {
            headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
        });
        console.log(response);
        setSubmitLoading(false);

        // Check the response, and redirect to home if successful
        if (response.status == 200) {
            notification.success({
            message: 'Your order has been submitted!'
            })
            setTimeout(() => {
            history.push('/');
            }, 4500);
        }
        } catch (err) {
        console.log(err);
        if (err.response && err.response.status == 500) {
            notification.error({
            message: 'Could not submit order',
            description: 'There was an error submitting your order, please try again.'
            })
        }
        }
    }

    // Check if authenticated before rendering the page, otherwise redirect to the home page
    if (!sessionStorage.getItem('user')) {
        history.push('/login');
    }

    
    return(
        <Page>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Top navigation bar */}
                <Row justify="center" gutter={[0, 16]}>
                    <NavigationBar history={history} defaultSelected='/order'/>
                </Row>

                {/* Add product form and cart information */}
                <Affix offsetTop={5}>   
                <Row style={{marginTop:'80px'}} justify="center" gutter={[0, 16]}>
                
                    <Col span={18}>
                    <Card style={{ borderRadius: '1.25rem', boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                        <Row>
                        {/* Total price, reset cart button, GST, and submit order button */}
                        <Col span={8} offset={9}>
                            <Row>
                            <Col span={12}>
                                <Statistic title="Total Price (AUD)" value={totalPrice} prefix="$" precision={2} />
                                <Button style={{ marginTop: 16 }} type="danger" onClick={() => returnCart()}>
                                    Return to Cart
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Statistic title="GST" value={0} prefix="$" precision={2} />
                                <Button style={{ marginTop: 16 }} type="primary" onClick={() => handleSubmit()} loading={submitLoading}>
                                    Submit Order
                                </Button>                            
                            </Col>
                            </Row>
                        </Col>
                        </Row>
                    </Card>
                    </Col>        
                </Row>
                </Affix>

                {/* <Affix offsetTop={160}> */}
                <Row style={{marginTop:'10px'}} justify="center" gutter={[32, 32]}>
                    <Col span={18}>
                    <Card style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                        <AddressesList></AddressesList>
                    </Card>
                    </Col>
                </Row>
                {/* </Affix> */}
                
            </Layout>
        </Page>
    )//end return

}//end CheckOutPage

export default withRouter(CheckOutPage);

const Page = styled.div`
    height: 100%
`