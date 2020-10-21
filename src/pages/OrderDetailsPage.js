import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

// Ant Design Components
import {
  Button,
  Col,
  Layout,
  notification,
  PageHeader,
  Row,
  Spin,
  Statistic,
} from 'antd';

// Ant Design Sub-Components
const { Content, Footer } = Layout;

// Ant Design Icons
import { ShoppingCartOutlined } from '@ant-design/icons';

// Application components
import HistoryProduct from '../components/HistoryProduct';
import NavigationBar from '../components/NavigationBar';


const OrderDetailsPage = ({ location, history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const order = location.state.order;
  const { lines } = order;
  const totalPrice = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const readdOrder = useStoreActions(actions => actions.cart.readdOrder);


  // When viewing a past order, we first retrieve the product data
  // for each product in the order. This information is needed to
  // be able to readd the entire order, or invividual products, back
  // to the cart
  useEffect(() => {
    const fetchProduct = async (line) => {
      const { productCode } = line;
      const response = await axios.get('/api/product', {
        params: {
          sessionKey: sessionStorage.getItem('sessionKey'),
          productCode: productCode
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      console.log(response);
      const product = {...response.data.data, ...line};
      setProducts(prev => [...prev, product]);
    }

    (async () => {
      await Promise.all(lines.map(line => fetchProduct(line)));
      setLoading(false);
    })();
    
  }, []);


  // Button to readd entire order to cart
  const readdButton = (
    <Button 
      icon={<ShoppingCartOutlined />} 
      type="primary"
      onClick={() => handleClick()}
    >
      Add Order To Cart
    </Button>
  )

  // Handles click of readd button
  const handleClick = () => {
    readdOrder(products);
    notification.success({ 
      message: 'Order was successfully readded to the cart',
      placement: 'topRight'
    });
  }

  // Check if authenticated before rendering the page
  if (!sessionStorage.getItem('user')) {
    history.push('/login');
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {/* Top navigation bar */}
      <NavigationBar history={history} defaultSelected={null} />
      
      {/* Content body */}
      <Content style={{ padding: '80px 16px' }}>
        <Row justify="center">
          <Col span={18}>
            <PageHeader
              style={{ borderRadius: '1.25rem', boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", marginBottom: 32 }}
              title={`Order ID: ${order.id}`}
              ghost={false}
              onBack={() => history.push('/history')}
              extra={readdButton}
            >
              <Statistic
                title="Total Price (ex GST)"
                prefix="$"
                value={totalPrice}
                precision={2}
                style={{
                  margin: '0 32px',
                }}
              />
            </PageHeader>
            {!loading && products.map(product => <HistoryProduct key={product.id} product={product} />)}
          </Col>
        </Row>
        {loading ? (
          <Row style={{ marginTop: 16 }} justify="center" align="middle">
            <Spin size="large" />
          </Row>
        ) : (
          null
        )}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>

    </Layout>
  )
}

export default withRouter(OrderDetailsPage); 