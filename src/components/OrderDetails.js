import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

// Ant Design Components
import {
  Button,
  Col,
  notification,
  PageHeader,
  Row,
  Spin,
  Statistic,
} from 'antd';

// Ant Design Icons
import { ShoppingCartOutlined } from '@ant-design/icons';

// Application components
import HistoryProduct from './HistoryProduct';


const OrderDetails = ({ order, onBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      placement: 'topLeft'
    });
  }

  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <PageHeader
            style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", marginBottom: 32 }}
            title={`Order ID: ${order.id}`}
            ghost={false}
            onBack={() => onBack()}
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
    </>
  )
}

export default withRouter(OrderDetails); 