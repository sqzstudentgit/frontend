import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup, waitForElement, waitForDomChange } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter } from 'react-router-dom';
import 'babel-polyfill';

// Testing pages
import { HistoryPage } from '../../src/pages/HistoryPage';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

beforeEach(() => {
  sessionStorage.clear();
});


afterEach(cleanup);
afterEach(() => {
  mockAxios.reset();
});


/**
 * TODO:
 * 1. Test empty order history                   [DONE]
 * 2. Test order history with at least one order [TODO]
 */


describe('Testing <HistoryPage />', () => {
  test('Test order history page', async () => {

    // sessionStorage.setItem('user', 'user');
    // history = createMemoryHistory();
  
    const historyMock = { push: jest.fn() };
  
  
    const { debug, getByText, queryByText } = render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );
  
    // Ensure 'Recent Orders' is rendered when page renders initially
    await waitFor(() => getByText('Recent Orders')); // THIS WORKS!!!
  
    // Emulate retrieving order history from backend with zero orders
    mockAxios.get.mockResolvedValueOnce({
      data: {
        message: "Successfully retrieved order history",
        orders: null,
        status: "success"
      }
    });
  
  
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(
        "/api/history",
        {"params": {"session_id": null}},
        {"headers": {"Content-Type": "application/JSON; charset=UTF-8"}}
      );
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  
    // Ensure 'No Data' appears in the table, since we have zero orders
    await waitFor(() => {
      expect(queryByText('No Data')).not.toBeNull();
    });
  
    // debug();
  })


  test('yes bro', () => {
    expect(true).toBe(true);
  });

});
