import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Ant Design Components
import {
  Affix,
  Alert,
  Button,
  Card,
  Col,
  Input,
  Layout,
  Menu,
  notification,
  Row,
  Statistic,
  Typography
} from 'antd';

// Ant Design Icons
import { 
  BarcodeOutlined,
  HistoryOutlined, 
  HomeOutlined, 
  LogoutOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

// 3D Image Rendering Component
import ThreeDModelPresenter from '../components/3DModel/ThreeDModelPresenter';


function OrderPage({ history }) {
  // Cart state
  const [barcode, setBarcode] = useState(null);
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

  // Sets alert message, type, and whether to show alert
  const setAlert = (message, type, showAlert) => {
    setMessage(message);
    setType(type);
    setShowAlert(showAlert);
  }

  // Handles click of navigation bar menu item
  const handleClick = ({ key }) => {
    // TODO: Fix this to handle logout call
    if (key != "4") {
      history.push(key)
    }
  }

  // Handles removal of single product from the cart
  const handleRemove = (keyProductID) => {
    setProducts(prev => prev.filter(product => product.keyProductID != keyProductID))
  }

  // Handles quantity change for a single product
  const handleQuantityChange = (keyProductID, quantity) => {
    // Find index for product to update
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

  // Handles barcode scan
  const handleScan = async (barcode) => {
    try {
      const response = await axios.get('/api/barcode', {
        params: {
          sessionKey: sessionStorage.getItem("sessionKey"),
          barcode: barcode
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })

      // Check if product already exists in the cart
      const newProduct = response.data.data;
      const exists = products.some((product) => product.keyProductID == newProduct.keyProductID );

      if (!exists) {
        setProducts(prev => [...prev, { ...newProduct, quantity: 1 } ]);
        setAlert("Your product has been added", "success", true);
      } else {
        setAlert("You have already added this product", "warning", exists);
      }
      setBarcode(null);

    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 500) {
        setAlert("The barcode you have entered is invalid, please try again", "error", true);
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
        <Menu.Item style={{ width: '150px', textAlign: 'center', fontFamily: "'Roboto', sans-serif;", fontSize: '1.25rem' }} key="/">HOLYSAS</Menu.Item>
          <Menu.Item icon={<HomeOutlined />} key="/">Home</Menu.Item>
          <Menu.Item icon={<HistoryOutlined />} key="/viewHistoryOrder">Order History</Menu.Item>
          <Menu.Item icon={<ShoppingCartOutlined />} key="/order">Order</Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} key="4">Logout</Menu.Item>
        </Menu>
      </Header>

      {/* Content body */}
      <Content style={{ padding: '80px 16px' }}>

        {/* Add product form and cart information */}
        <Affix offsetTop={80}>
          <Row justify="center" gutter={[32, 32]}>
            <Col span={18}>
              <Card>
                <Row>
                  <Col span={8}>
                    <Title level={4}>Add Product</Title>
                    <Input placeholder="Enter barcode" prefix={<BarcodeOutlined />} value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                    {showAlert && <Alert style={{ marginTop: 16 }} message={message} type={type} onClose={() => setShowAlert(false)} showIcon closable  />}
                    <Button style={{ marginTop: 16 }} type="secondary" onClick={() => handleScan(barcode)}>Scan</Button>
                  </Col>
                  <Col span={8} offset={8}>
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
              <ProductCard
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