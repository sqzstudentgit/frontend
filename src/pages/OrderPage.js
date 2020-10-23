import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import TallCartProduct from '../components/TallCartProduct';
import ShortCartProduct from '../components/ShortCartProduct';
import NavigationBar from '../components/NavigationBar';

// Ant Design Components
import {
  Affix,
  Alert,
  AutoComplete,
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
  LayoutOutlined,
  DatabaseOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Content, Footer } = Layout;
const { Search } = Input;

// https://www.digitalocean.com/community/tutorials/react-live-search-with-axios

import { search } from '../utils/search';


/**
 * The OrderPage component is the page that is loaded when
 * the 'Order' menu item is clicked on the top navigation bar.
 * 
 * It is responsible for:
 *    1. Allowing users to add products via either product code or barcode
 *    2. Displaying the products in the cart, in either list view or tall view
 *    3. Submitting the order to the SQUIZZ platform
 */
const OrderPage = ({ history }) => {
  // General page state
  const [input, setInput] = useState(null);
  const [inputType, setInputType] = useState('barcode');
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [viewType, setViewType] = useState('short');

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
    console.log('Search onSearch called');
    setOpen(false);
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
      console.log('Setting input null');
      setInput(null);

    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 500) {
        setAlert("There was an error searching for your product, please try again", "error", true);
        setSearchLoading(false);
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


  const searchResult = (value) => {

    // (async () => {
    //   const response = await axios.get('/api/products/search', {
    //     params: {
    //       identifier: value,
    //       identifierType: inputType
    //     }
    //   });

    //   console.log(response);
    // })();
    

    return [
      {
          value: "CFP-600-12"
      },
      {
          value: "CFP-600-12-LPP-150"
      },
      {
          value: "CFP-600-12-LPP-200"
      },
      {
          value: "CFP-600-12-LPP-250"
      }
    ]
  }

  // Refreshes the search results when the input product type is changed
  useEffect(() => {
    (async () => {
      handleSearch(input);
    })();
  }, [inputType]);






  // NEW SEARCH FORM SHIT
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChangeInputType = (e) => {

  }



  const handleSelect = (value) => {
    // Set input value, closes the search results pane
    console.log('Autocomplete onSelect:', value);
    setInput(value);
    setOpen(false);
  }

  const handleSearch = async (value) => {
    // Search the database for similar values

    // 1. Call endpoint to search db
    // 2. setOptions to the processed result
    // 3. setOpen true
    console.log('Autocomplete onSearch:', value);

    if (!value) {
      return setOptions([]);
    }

    const identifierType = inputType == 'barcode' ? 'barcode' : 'productCode';
    const result = await search(
      `/api/products/search?identifier=${value}&identifierType=${identifierType}`
    );

    if (!result) {
      return setOptions([]);
    }

    const { identifiers, message, status } = result;
    // console.log(message);
    // console.log(status);
    console.log(identifiers);

    if (!identifiers) {
      return setOptions([]);
    }
    
    const searchResults = identifierType == 'barcode'? identifiers.map(({ barcode }) => ({ value: barcode })) : identifiers.map(({ productCode }) => ({ value: productCode }));

    console.log(searchResults);
    // setOptions(value ? searchResult(value) : []);
    setOptions(searchResults);
    setOpen(true);
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <NavigationBar history={history} defaultSelected='/order'/>
      

      {/* Content body */}
      <Content style={{ padding: '80px 16px' }}>

        {/* Add product form and cart information */}
        <Affix offsetTop={80}>
          <Row justify="center" gutter={[0, 16]}>
            <Col span={18}>
              <Card style={{ borderRadius: '1.25rem', boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                <Row>
                  <Col span={12}>

                    {/* Product search form */}
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
                        <AutoComplete
                          options={options}
                          onSelect={handleSelect}
                          onSearch={handleSearch}
                          open={open}
                        >
                          <Search
                            prefix={inputType == 'barcode' ? <BarcodeOutlined /> : <KeyOutlined />}
                            placeholder={inputType == 'barcode' ? "Enter barcode" : "Enter product code"}
                            value={input}
                            loading={searchLoading}
                            onSearch={() => handleAddProduct()}
                          />
                        </AutoComplete>
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

          {/* Tall view and short view buttons */}
          <Row justify="center" gutter={[0, 16]}>
            <Col span={18}>
              <div style={{ textAlign: 'end' }}>
                <Button 
                  icon={<LayoutOutlined />}
                  onClick={() => setViewType('tall')}
                >
                  Tall View
                </Button>
                <Button
                  style={{ layout: 'inline-block' }} 
                  icon={<VerticalAlignMiddleOutlined />}
                  onClick={() => setViewType('short')}
                >
                  Short View
                </Button>
              </div>
            </Col>
          </Row>
        </Affix>

        {viewType == 'tall' ? (
          products.map(product =>
            <TallCartProduct
              key={product.keyProductID}
              product={product} 
              onRemove={handleRemove} 
              onQuantityChange={handleQuantityChange}
            />
          )
        ) : (
          products.map(product =>
            <ShortCartProduct
              key={product.keyProductID}
              product={product} 
              onRemove={handleRemove} 
              onQuantityChange={handleQuantityChange}
            />
          )
        )}
      </Content>
      
      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
    </Layout>
  )
}

export default withRouter(OrderPage);