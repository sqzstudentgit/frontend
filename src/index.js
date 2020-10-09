import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { action, actionOn, createStore, StoreProvider } from 'easy-peasy';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ProductDetailPage from './pages/productDetailPage';
import HistoryPage from './pages/HistoryPage';
import OrderPage from './pages/OrderPage';
import 'antd/dist/antd.css';
import './index.css';


const App = () => {
  // Create a store for global application state for cart
  const store = createStore({
    cart: {
      // Cart state
      products: [],
      totalPrice: 0,

      // Cart state listener
      // Note: actionOn has been used instead of computed for total price since 
      // there is a bug with computed where the computed value is updated one action behind
      onCartChange: actionOn(
        actions => [
          actions.addProduct, 
          actions.removeProduct, 
          actions.changeQuantity,
          actions.emptyCart,
          actions.readdProduct,
          actions.readdOrder
        ],
        (state, _) => {
          state.totalPrice = state.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        }
      ),

      // -- CART ACTIONS --

      // Adds a product to the cart. Note that this action does not check whether
      // a product with the same keyProductID has already been added to the cart
      addProduct: action((state, product) => {
        state.products.push(product);
      }),

      // Removes a product from the cart with the given keyProductID
      removeProduct: action((state, keyProductID) => {
        state.products = state.products.filter((product => product.keyProductID != keyProductID))
      }),

      // Changes the quantity for a product with the given keyProductID
      changeQuantity: action((state, { keyProductID, quantity }) => {
        state.products = state.products.map(product => {
          if (product.keyProductID == keyProductID) {
            product.quantity = quantity;
          }
          return product;
        })
      }),

      // Empties the cart
      emptyCart: action((state) => {
        state.products = []
      }),

      // Adds a product (and its corresponding quantity) from a previous order to the cart.
      // First, checks if the given product exists in the cart, and sets the quantity accordingly
      readdProduct: action((state, product) => {
        const exists = state.products.some((curr) => curr.keyProductID == product.keyProductID);
        if (exists) {
          state.products.map(curr => {
            if (curr.keyProductID == product.keyProductID) {
              curr.quantity += product.quantity;
            }
            return curr;
          })
        } else {
          state.products.push(product);
        }
      }),

      // Adds an entire order from the order history to the cart
      readdOrder: action((state, products) => {
        for (let product of products) {
          const exists = state.products.some((curr) => curr.keyProductID == product.keyProductID);
          if (exists) {
            state.products.map(curr => {
              if (curr.keyProductID == product.keyProductID) {
                curr.quantity += product.quantity;
              }
              return curr;
            })
          } else {
            state.products.push(product);
          }
        }
      })
    }
  })




  return (
    <StoreProvider store={store}>
      <Router>
        <div className="App" style={{height: '100%', width:'100%'}}>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/history" exact component={HistoryPage}/>
          <Route path="/order" exact component={OrderPage}/>
          <Route path="/product" exact component={ProductDetailPage} />
        </div>
      </Router>
    </StoreProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));


export default App;