import axios from 'axios';
import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import NavigationBar from "../components/NavigationBar";

// Ant Design Components
import {
  Affix,
  Alert,
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

// Ant Design Icons
import {
  BarcodeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Content, Footer } = Layout;
const { Search } = Input;


const OrderPage = ({ history }) => {
  // General page state
  const [input, setInput] = useState(null);
  const [inputType, setInputType] = useState('barcode');
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Alert component state
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  // Global cart state
  const { products, totalPrice } = useStoreState(state => ({
    products: state.cart.products,
    totalPrice: state.cart.totalPrice
  }))

  // Global cart actions
  const { addProduct, removeProduct, changeQuantity, emptyCart } = useStoreActions(actions => ({
    addProduct: actions.cart.addProduct,
    removeProduct: actions.cart.removeProduct,
    changeQuantity: actions.cart.changeQuantity,
    emptyCart: actions.cart.emptyCart
  }))

  // Sets alert message, type, and whether to display the alert
  const setAlert = (message, type, showAlert) => {
    setMessage(message); setType(type); setShowAlert(showAlert);
  }

  // Handles removal of single product from the cart
  const handleRemove = (keyProductID) => {
    removeProduct(keyProductID);
  }

  // Handles quantity change for a single product
  const handleQuantityChange = (keyProductID, quantity) => {
    changeQuantity({ keyProductID: keyProductID, quantity: quantity });
  }

  // Handles addition of product to the cart
  const handleAddProduct = async () => {
    
    try {
      setSearchLoading(true);
      const response = await axios.get(`/api/${inputType}`, {
        params: {
          sessionKey: sessionStorage.getItem("sessionKey"),
          barcode: input,
          productCode: input
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      setSearchLoading(false);

      console.log(response);

      // Check if the product exists in the database
      if (response.data.status == 'error') {
        switch (inputType) {
          case 'product':
            setAlert("The product code you have entered is invalid", "error", true);
            break;
          case 'barcode':
            setAlert("The barcode you have entered is invalid", "error", true);
            break;
          default:
            setAlert("The input you have entered is invalid", "error", true);
        }
        return;
      }

      // If valid product, check if it already exists in the cart
      const newProduct = response.data.data;
      const exists = products.some((product) => product.keyProductID == newProduct.keyProductID);

      if (!exists) {
        addProduct({ ...newProduct, quantity: 1 });
        setAlert("Your product has been added", "success", true);
      } else {
        setAlert("You have already added this product", "warning", exists);
      }

      // Reset input field
      setInput(null);

    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 500) {
        setAlert("There was an error searching for your product, please try again", "error", true);
      }
    }
  } 


  // Handles order submission
  const handleSubmit = async () => {
    // Check if the cart is empty
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
      const response = await axios.post('/api/purchase', {
        lines: lines,
        sessionKey: sessionStorage.getItem('sessionKey')
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      });
      console.log(response);
      setSubmitLoading(false);

      if (response.status == 200) {
        notification.success({
          message: 'Your order has been submitted!'
        })

        setTimeout(() => {
          emptyCart()
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

  // Check if authenticated before rendering the page
  if (!sessionStorage.getItem('user')) {
    history.push('/login');
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <NavigationBar history={history} defaultSelected='/order'/>
      

      {/* Content body */}
      <Content style={{ padding: '80px 16px' }}>

        {/* Add product form and cart information */}
        <Affix offsetTop={80}>
          <Row justify="center" gutter={[32, 32]}>
            <Col span={18}>
              <Card style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <Row>
                  <Col span={12}>
                    {/* Add product form */}
                    <Form labelCol={{ span: 4 }} >
                      <Form.Item label="Type">
                        <Radio.Group
                          value={inputType}
                          options={[{ label: 'Product Code', value: 'product' }, { label: 'Barcode', value: 'barcode' }]}
                          onChange={(e) => setInputType(e.target.value)}
                          optionType="button"
                        />
                      </Form.Item>
                      <Form.Item label="Product">
                        <Search
                          prefix={inputType == 'barcode' ? <BarcodeOutlined /> : <KeyOutlined />}
                          placeholder={inputType == 'barcode' ? "Enter barcode" : "Enter product code"}
                          value={input}
                          loading={searchLoading}
                          onChange={(e) => setInput(e.target.value)}
                          onSearch={() => handleAddProduct()}
                        />
                      </Form.Item>
                    </Form>

                    {/* Alert message */}
                    {showAlert && <Alert style={{ marginTop: 8 }} message={message} type={type} onClose={() => setShowAlert(false)} showIcon closable />}
                  </Col>

                  {/* Total price, reset cart button, GST, and submit order button */}
                  <Col span={8} offset={4}>
                    <Row>
                      <Col span={12}>
                        <Statistic title="Total Price (AUD)" value={totalPrice} prefix="$" precision={2} />
                        <Button style={{ marginTop: 16 }} type="danger" onClick={() => emptyCart()}>
                          Reset Cart
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
        
        {
          // Map each product in the cart to a product card
          products.map(product => {
            return (
              <CartProduct
                key={product.keyProductID}
                product={product} 
                onRemove={handleRemove} 
                onQuantityChange={handleQuantityChange}
              />
            )
          })
        }

      </Content>
      
      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
    </Layout>
  )
}

export default withRouter(OrderPage);