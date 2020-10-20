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
import { ShopOutlined } from '@ant-design/icons';

const ProductList = ({ product}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { lines } = product;

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
          setProducts(prev => [...prev, {...response.data.data, ...line}]);
        }
    
        for (let line of lines) {
          try {
            fetchProduct(line);
    
          } catch (err) {
            console.log(err);
            console.log(err.response);
          }
        }
        setLoading(false);
    
        
      }, []);

      return (
          <Row justify="center">
              <Col span={18}>
                {!loading && products.map(product => <HistoryProduct key={product.id} product={product} />)}
              </Col>
          </Row>

      )

}


export default withRouter(ProductList);
