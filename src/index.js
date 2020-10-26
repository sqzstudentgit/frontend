import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import CreatePage from './pages/createPage';
import ChooseCustomerPage from './pages/chooseCustomerPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import HistoryPage from './pages/HistoryPage';
import OrderPage from './pages/OrderPage';

import CheckOutPage from './pages/CheckOutPage';

// CSS
import CategoryPage from './pages/CategoryPage';
import store from './store';
import 'antd/dist/antd.css';
import './index.css';


// Create a wrapper component for the main application. This allows the
// main content to not render until the store has been successfully updated with
// the rehydration state
const WaitForStateReyhydration = ({ children }) => {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

// Main application component
const App = () => {
  return (
    <StoreProvider store={store}>
      <WaitForStateReyhydration>
        <Router>
          <div className="App" style={{height: '100%', width:'100%'}}>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/history" exact component={HistoryPage}/>
            <Route path="/order" exact component={OrderPage}/>
            <Route path="/create" exact component={CreatePage}/>
            <Route path="/choose" exact component={ChooseCustomerPage}/>
            <Route path="/productList" exact component={ProductListPage}/>
            <Route path="/products/:productCode*" exact component={ProductDetailsPage} />
            <Route path="/orders/:orderId" exact component={OrderDetailsPage} />
            <Route path="/productCategories/:id" exact component={CategoryPage} />
            <Route path="/checkout" exact component={CheckOutPage} />
            
          </div>
        </Router>
      </WaitForStateReyhydration>
    </StoreProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));

export default App;
