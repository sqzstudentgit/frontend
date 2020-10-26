import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';

// 
// import ProductListPage from '../pages/productListPage';

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

class ProductList extends React.Component{

  render() {
    return(
      <div className="product" key={this.props.id}>
        {this.props.name}
      </div>
    )
  }

}


export default ProductList
