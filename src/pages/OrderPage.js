import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CartProduct from '../components/CartProduct';

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
  Menu,
  notification,
  Radio,
  Row,
  Statistic,
  Typography
} from 'antd';

// Ant Design Icons
import { 
  BarcodeOutlined,
  HistoryOutlined, 
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Title } = Typography;
const { Header, Content, Footer } = Layout;


function OrderPage({ history }) {
  // Cart state
  const [input, setInput] = useState(null);
  const [inputType, setInputType] = useState('barcode');
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Alert component state
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);


  // Recalculates total price when cart changes
  useEffect(() => {
    const newTotalPrice = products.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [products]);


  // Handles click of navigation bar menu item
  const handleClick = ({ key }) => {
    // TODO: Fix this to handle logout call
    if (key.startsWith('/')) {
      history.push(key)
    }
  }

  // Sets alert message, type, and whether to display the alert
  const setAlert = (message, type, showAlert) => {
    setMessage(message); setType(type); setShowAlert(showAlert);
  }


  // Handles removal of single product from the cart
  const handleRemove = (keyProductID) => {
    setProducts(prev => prev.filter(product => product.keyProductID != keyProductID))
  }


  // Handles quantity change for a single product
  const handleQuantityChange = (keyProductID, quantity) => {
    // Find index of product to update
    let index = products.findIndex((product) => product.keyProductID == keyProductID);

    // Update the quantity for that product, without mutating the original array
    if (index != -1) {
      let updatedProducts = [ ...products ];
      let product = { ...updatedProducts[index] };
      product.quantity = quantity;
      updatedProducts[index] = product;
      setProducts(updatedProducts);
    }
  }


  // Handles addition of product to the cart
  const handleAddProduct = async () => {
    try {
      const response = await axios.get(`/api/${inputType}`, {
        params: {
          sessionKey: sessionStorage.getItem("sessionKey"),
          barcode: input,
          id: input
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })

      console.log(response);

      // Check if product already exists in the cart
      const newProduct = response.data.data;
      const exists = products.some((product) => product.keyProductID == newProduct.keyProductID );

      if (!exists) {
        setProducts(prev => [...prev, { ...newProduct, quantity: 1 } ]);
        setAlert("Your product has been added", "success", true);
      } else {
        setAlert("You have already added this product", "warning", exists);
      }

      // Reset input field
      setInput(null);

    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 500) {
        if (inputType == 'product') {
          setAlert("The product code you have entered is invalid", "error", true);
        } else {
          setAlert("The barcode you have entered is invalid", "error", true);
        }
      }
    }
  } 


  // Handles order submission
  const handleSubmit = async () => {
    if (products.length == 0) {
      notification.warning({
        message: 'Your cart is empty',
        description: 'Please add a product to your cart before submitting an order'
      })
      return;
    }

    let lines = products.map(product => ({ 
      ...product,
      lineType: "PRODUCT",
      priceTotalExTax: product.price,
      totalPrice: product.price * product.quantity
    }))

    try {
      const response = await axios.post('/api/purchase', {
        lines: lines,
        sessionKey: sessionStorage.getItem('sessionKey')
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      });
      console.log(response);

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['/order']}>
        <Menu.Item style={{ width: '150px', textAlign: 'center', fontFamily: "'Roboto', sans-serif", fontSize: '1.25rem' }}>HOLYSAS</Menu.Item>
          <Menu.Item icon={<HomeOutlined />} key="/">Home</Menu.Item>
          <Menu.Item icon={<HistoryOutlined />} key="/viewHistoryOrder">Order History</Menu.Item>
          <Menu.Item icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
      </Header>

      {/* Content body */}
      <Content style={{ padding: '80px 16px' }}>

        {/* Add product form and cart information */}
        <Affix offsetTop={80}>
          <Row justify="center" gutter={[32, 32]}>
            <Col span={18}>
              <Card style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <Row>
                  <Col span={10}>
                    {/* Add product form */}
                    <Title level={4}>Add Product</Title>
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
                        <Input
                          prefix={inputType == 'barcode' ? <BarcodeOutlined /> : <KeyOutlined />}
                          placeholder={inputType == 'barcode' ? "Enter barcode" : "Enter product code"}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button type="secondary" onClick={() => handleAddProduct()}>Add</Button>
                      </Form.Item>
                    </Form>

                    {/* Alert message */}
                    {showAlert && <Alert style={{ marginTop: 8 }} message={message} type={type} onClose={() => setShowAlert(false)} showIcon closable />}
                  </Col>

                  <Col span={8} offset={6}>
                    <Row>
                      <Col span={12}>
                        <Statistic title="Total Price (AUD)" value={totalPrice} prefix="$" precision={2} />
                        <Button style={{ marginTop: 16 }} type="danger" onClick={() => setProducts([])}>
                          Reset Cart
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Statistic title="GST" value={0} prefix="$" precision={2} />
                        <Button style={{ marginTop: 16 }} type="primary" onClick={() => handleSubmit()}>
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