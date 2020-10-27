import LoginPage from '../../src/pages/loginPage'
import HomePage from '../../src/pages/HomePage'
import HistoryOrdersPage from '../../src/pages/historyOrdersPage'
import CurrentOrderPage from '../../src/pages/currentOrderPage';

import React, { Children } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import 'babel-polyfill';
import {Router as Router, Route, Switch}  from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { FaItalic } from 'react-icons/fa';


describe('homePage', () =>{

    beforeEach(() => {
        sessionStorage.clear();
    });

    it('should switch to the correct page when user click', async () => {
        
        //push current path to memory history
        const history = createMemoryHistory()
        sessionStorage.setItem('user', "user");

        //render testing page
        const { container, getByText } = render(
        <Router history={history}>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/viewHistoryOrder" component={HistoryOrdersPage}/>
          <Route path="/order_detail_:orderId" component={HistoryOrdersPage}/>
          <Route path="/order" exact component={CurrentOrderPage}/>
        </Router>
        )

        //expected to be on homepage
        expect(history.location.pathname).toEqual('/');

        await fireEvent.click(screen.getByText(/Shop/i))
        expect(history.location.pathname).toEqual('/order')
        
        history.goBack()
        expect(history.location.pathname).toEqual('/');

        await fireEvent.click(screen.getByText(/Browse My History/i))
        expect(history.location.pathname).toEqual('/viewHistoryOrder');

    })

})