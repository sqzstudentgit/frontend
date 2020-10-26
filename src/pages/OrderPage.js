import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import { search } from '../utils/search';
import TallCartProduct from '../components/TallCartProduct';
import ShortCartProduct from '../components/ShortCartProduct';
import NavigationBar from '../components/NavigationBar';

// Todo: This is the temp design for Checkout - Add Billing Address & Delivery Address function
import AddAddressForm from '../components/AddAddressForm';
import AddressesList from '../components/AddressesList'

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
  VerticalAlignMiddleOutlined
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Content, Footer } = Layout;
const { Search } = Input;


/**
 * The OrderPage component is the page that is loaded when
 * the 'Order' menu item is clicked on the top navigation bar.
 *
 * It is responsible for:
 *    1. Allowing users to search for and add products via product code or barcode
 *    2. Displaying the products in the cart, in either tall view or short view
 *    3. Submitting an order to the SQUIZZ platform
 */
const OrderPage = ({ history }) => {
  // General page state
  const [input, setInput] = useState(null);                   // The current input field value
  const [inputType, setInputType] = useState('barcode');      // The current input type value ('product' or 'barcode')
  const [options, setOptions] = useState([]);                 // The autocomplete results array
  const [open, setOpen] = useState(false);                    // Whether to show the autocomplete results array
  const [searchLoading, setSearchLoading] = useState(false);  // Product search loading state
  const [submitLoading, setSubmitLoading] = useState(false);  // Order submission loading state
  const [viewType, setViewType] = useState('short');          // Cart products view type ('short' or 'tall')

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
  }));

  // Refreshes the search results when the input or input type is changed
  useEffect(() => {
    (async () => {
      handleSearch(input);
    })();
  }, [input, inputType]);


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


  /**
   * Handles addition of a product to the cart
   * @param {string} value a potential product code or barcode
   */
  const handleAddProduct = async (value) => {
    setOpen(false);
    try {
      setSearchLoading(true);
      const response = await axios.get(`/api/${inputType}`, {
        params: {
          sessionKey: sessionStorage.getItem("sessionKey"),
          barcode: value,
          productCode: value
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      setSearchLoading(false);

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
      setInput(null);

    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 500) {
        setAlert("There was an error searching for your product, please try again", "error", true);
        setSearchLoading(false);
      }
    }
  }


  const handleSubmit = () =>{
    history.push('/checkout');
  }
  // /**
  //  * Handles submission of an order to the backend API endpoint
  //  */
  // const handleSubmit = async () => {
  //   // First, check if the cart is empty
  //   if (products.length == 0) {
  //     notification.warning({
  //       message: 'Your cart is empty',
  //       description: 'Please add a product to your cart before submitting an order'
  //     })
  //     return;
  //   }

  //   // Map products in the cart to 'lines' (i.e. order details)
  //   let lines = products.map(product => ({
  //     ...product,
  //     lineType: "PRODUCT",
  //     unitPrice: product.price,
  //     totalPrice: product.price * product.quantity,
  //     priceTotalExTax: product.price * product.quantity
  //   }))

  //   // Submit the order to the backend API endpoint
  //   try {
  //     setSubmitLoading(true);
  //     console.log(lines)
  //     const response = await axios.post('/api/purchase', {
  //       lines: lines,
  //       sessionKey: sessionStorage.getItem('sessionKey')
  //     }, {
  //       headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
  //     });
  //     console.log(response);
  //     setSubmitLoading(false);

  //     // Check the response, and redirect to home if successful
  //     if (response.status == 200) {
  //       notification.success({
  //         message: 'Your order has been submitted!'
  //       })
  //       setTimeout(() => {
  //         emptyCart()
  //         history.push('/');
  //       }, 4500);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response && err.response.status == 500) {
  //       notification.error({
  //         message: 'Could not submit order',
  //         description: 'There was an error submitting your order, please try again.'
  //       })
  //     }
  //   }
  // }


  /**
   * Handles selection of a product code or barcode from the returned search results box
   * @param {string} value a valid product code or barcode
   */
  const handleSelect = (value) => {
    // Set input value and close the search results pane
    setInput(value);
    setOpen(false);
  }


  /**
   * Live searches the database for product codes and barcodes
   * that match a potential product 'identifier'. This method
   * is called when the input field value or input field type is
   * changed.
   * @param {string} identifier a potential product code or barcode
   */
  const handleSearch = async (identifier) => {
    // Do not search if the input value is the empty string or null
    if (!identifier) {
      return setOptions([]);
    }

    // Query the database for product codes or barcodes that are similar to the input identifier
    const identifierType = inputType == 'barcode' ? 'barcode' : 'productCode';
    const result = await search(
      `/api/products/search?identifier=${identifier}&identifierType=${identifierType}`
    );

    // Result will be null in the case that the axios request was cancelled prematurely
    if (!result) {
      return setOptions([]);
    }

    // Process the list of identifiers. Identifiers will be null if no products in the database
    // have similar barcodes or product codes to the identifier given in the query
    const { identifiers } = result;
    if (!identifiers) {
      return setOptions([]);
    }

    // Map the identifiers to objects that can be displayed in the search results box
    const searchResults = identifiers.map((identifier) => {
      return {
        value: identifier.productCode || identifier.barcode
      }
    });

    // Display the search results
    setOptions(searchResults);
    setOpen(true);
  }


  // Check if authenticated before rendering the page, otherwise redirect to the home page
  if (!sessionStorage.getItem('user')) {
    history.push('/login');
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
                          onSearch={(value) => setInput(value)}
                          open={open}
                          value={input}
                        >
                          <Search
                            prefix={inputType == 'barcode' ? <BarcodeOutlined /> : <KeyOutlined />}
                            placeholder={inputType == 'barcode' ? "Enter barcode" : "Enter product code"}
                            value={input}
                            loading={searchLoading}
                            onSearch={(value) => handleAddProduct(value)}
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
                          Checkout
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

        {/* {
          // Map each product in the cart to a product card
          products.map(product => {
            return (
              <ShortCartProduct
                key={product.keyProductID}
                product={product}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />
            )
          })
        } */}

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
