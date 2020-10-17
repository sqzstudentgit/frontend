import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';

// Ant Design Components
import {
  Button,
  Col,
  Layout,
  Row,
  Spin,
  Table,
  Tag,
  Typography
} from 'antd';


// Ant Design Sub-Components
const { Content, Footer } = Layout;
const { Title } = Typography;

// Application components
import NavigationBar from '../components/NavigationBar';
import OrderDetails from '../components/OrderDetails';


/**
 * HistoryPage is the component that contains the order history table.
 * It is the component that is rendered when the 'Order History' button
 * is clicked on the top navigation bar.
 * 
 * It is also responsible for being able to view a specific order.
 * When a 'View Order' button is clicked in the 'Manage' column of the table,
 * it renders an 'OrderDetails' component for that specific order. 
 * 
 * @param {object} history from the React router 
 */
const HistoryPage = ({ history }) => {
  const [orders, setOrders] = useState([]);        // The actual order history
  const [orderId, setOrderId] = useState(null);    // The ID of the order to be viewed
  const [loading, setLoading] = useState(true);    // Whether the page is loading (i.e. orders are still being retrieved)
  const [redirect, setRedirect] = useState(false); // Whether to redirect to view a specific order
  const [order, setOrder] = useState(null);


  // Before the order history page is mounted, retrieve the orders from the database
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await axios.get('/api/history', {
        params: {
          session_id: sessionStorage.getItem("sessionKey"),
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      console.log(response);
      setLoading(false);
      setOrders(response.data.orders);
    }

    try {
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  }, []);


  const handleViewOrder = (id) => {
    setOrderId(id);
    setRedirect(true);
  }

  const handleBack = () => {
    setOrder(null);
  }


  // Order history table columns
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

  // If the user has chosen to view a specific order, redirect them 
  // to the OrderDetailsPage, passing the specific order as props to the page
  if (redirect) {
    let pathname = `/orders/${orderId}`;
    console.log(`Trying to redirect to ${pathname}`);
    let orderlol = orders.find(order => order.id == orderId);
    return (
      <Redirect 
        to={{
          pathname: pathname,
          state: { order: orderlol }
        }} 
      />
    )
  }

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