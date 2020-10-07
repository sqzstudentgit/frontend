import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { action, actionOn, computed, createStore, StoreProvider } from 'easy-peasy';
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
          actions.emptyCart
        ],
        (state, _) => {
          state.totalPrice = state.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        }
      ),

      // Cart actions
      addProduct: action((state, product) => {
        state.products.push(product);
      }),
      removeProduct: action((state, keyProductID) => {
        state.products = state.products.filter((product => product.keyProductID != keyProductID))
      }),
      changeQuantity: action((state, { keyProductID, quantity }) => {
        state.products = state.products.map(product => {
          if (product.keyProductID == keyProductID) {
            product.quantity = quantity;
          }
          return product;
        })
      }),
      emptyCart: action((state) => {
        state.products = []
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