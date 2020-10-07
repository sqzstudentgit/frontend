import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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

// Application components
import NavigationBar from '../components/NavigationBar';
import OrderDetails from '../components/OrderDetails';


const HistoryPage = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/history', {
        params: {
          session_id: sessionStorage.getItem("sessionKey"),
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      console.log(response);
      setOrders(response.data.orders);
    }

    try {
      setLoading(true);
      fetchOrders();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);


  const handleViewOrder = (id) => {
    setOrder(orders.find(order => order.id == id));
  }

  const handleBack = () => {
    setOrder(null);
  }


  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Total Products',
      dataIndex: 'lines',
      key: 'totalProducts',
      render: (lines) => lines.length
    },
    {
      title: 'Date',
      dataIndex: 'createdOnDate',
      key: 'createdOnDate',
      render: (date) => {
        const formattedDate = new Date(date).toLocaleString("en-AU", { timeZone: "Australia/Melbourne" });
        return formattedDate;
      }
    },
    {
      title: 'Billing Contact',
      dataIndex: 'billingContact',
      key: 'billingContact'
    },
    {
      title: 'Order Total (ex GST)',
      dataIndex: 'lines',
      key: 'total',
      align: 'right',
      render: (lines) => {
        const total = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);
        return `\$${total.toFixed(2)}`;
      }
    },
    {
      title: 'Status',
      dataIndex: 'billStatus',
      key: 'billStatus',
      align: 'center',
      render: (status) => <Tag color='green'>{status}</Tag>
    },
    {
      title: 'Manage',
      align: 'center',
      dataIndex: 'id',
      key: 'manage',
      render: (id) => <Button type="link" onClick={() => handleViewOrder(id)}>View Order</Button>
    }
  ]


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <NavigationBar history={history} defaultSelected="/history" />

      {/* Content body */}
      <Content style={{ padding: '90px 16px' }}>
        {!order ? (
          <Row justify="center">
            <Col span={18}>
              <Title level={4}>Recent Orders</Title>
              {loading ? <Spin /> : <Table dataSource={orders} columns={columns} rowKey={(row) => row.id} />}
            </Col>
          </Row>
        ) : (
          <OrderDetails order={order} onBack={handleBack} />
        )}
      </Content>
      
      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
    </Layout>
  )
}


export default withRouter(HistoryPage);