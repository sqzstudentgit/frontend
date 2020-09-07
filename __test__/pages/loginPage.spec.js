import LoginPage from '../../src/pages/loginPage'
import HomePage from '../../src/pages/homePage'

import React, { Children } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import 'babel-polyfill';
import {Router as Router, Route, Switch}  from 'react-router-dom';
import { createMemoryHistory } from 'history'



describe('loginPage', () =>{

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should switch home page with successful verification after getting response from the server', async () => {

    //push current path to memory history
    const history = createMemoryHistory()

    
    //render testing page
    const { container, getByText } = render(
        <Router history={history}>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" exact component={LoginPage}/>
        </Router>
      )
    
    //when not login, user should be directed to login page
    expect(history.location.pathname).toEqual('/login');

    //simulate user type in password
    const username = 'me';
    const password = 'please';
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } })

    //fire loging event  
    await fireEvent.click(screen.getByText('Login'))
    let responseObj = {data: {session_id: "C6F88C65C43F5FA922BECAAEF06BB4F3"}, message: "LOGIN_SUCCESS", status: "success" };

    //fake server response and expect page switch
    await mockAxios.mockResponse({data : responseObj});
    expect(history.location.pathname).toEqual('/')
    
    //Successfully store the session key
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(2);

    //rerender with homepage when login success
    await waitFor(() => {
      expect(screen.getByText('History Orders')).toBeInTheDocument()
    })
        
  })


  it('should show user validation error without switching page', async () => {
    //push current path to memory history
    const history = createMemoryHistory()
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);

    
    //render testing page
    const { container, getByText } = render(
        <Router history={history}>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" exact component={LoginPage}/>
        </Router>
      )
    
    //when not login, user should be directed to login page
    expect(history.location.pathname).toEqual('/login');

    //simulate user type in password
    const username = 'me';
    const password = 'please';
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } })


    //fire loging event  
    await fireEvent.click(screen.getByText('Login'))
    let responseObj = {data: {session_id: "C6F88C65C43F5FA922BECAAEF06BB4F3"}, message: "LOGIN_SUCCESS", status: "fail" };

    //fake server response and expect page stay
    await mockAxios.mockResponse({data : responseObj});
    expect(history.location.pathname).toEqual('/login')

    //no session key store
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);

    //error message show up
    const message = screen.queryByText('Sorry, your username and/or password are incorrect. Please try again.')
    expect(message ).not.toBeNull()
    })
   
})