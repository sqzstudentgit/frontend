import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
  PageHeader,
  Row,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

// Ant Design Icons
import {
  BarcodeOutlined,
  HistoryOutlined, 
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined, 
  ShoppingCartOutlined,
  ReconciliationOutlined
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;


import HistoryProduct from './HistoryProduct';



const OrderDetails = ({ order, history, onBack }) => {
  const { lines } = order;
  const totalPrice = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <Row justify="center">
      <Col span={18}>
        <PageHeader
          style={{ borderRadius: '1.25rem', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", marginBottom: 32 }}
          title={`Order ID: ${order.id}`}
          ghost={false}
          onBack={() => onBack()}
          extra={<Button icon={<ShoppingCartOutlined />} type="primary">Add Order To Cart</Button>}
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

        {lines.map(line => <HistoryProduct key={line.id} line={line} />)}
      </Col>
    </Row>
  )
}

export default withRouter(OrderDetails); 