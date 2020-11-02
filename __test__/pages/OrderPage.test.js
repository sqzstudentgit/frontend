import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter } from 'react-router-dom';
import 'babel-polyfill';

// Testing pages
import OrderPage from '../../src/pages/OrderPage';

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
 * 1. Test empty cart submission and subsequent error notification [DONE]
 * 2. Test product live search form and autocomplete               [DONE]
 * 3. Test product not found and subsequent error                  [TODO]
 */


describe('Testing <OrderPage />', () => {

  test('Submitting an order while cart is empty', async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>
    );
  
    fireEvent.click(getByText('Checkout'));
  
    await waitFor(() => {
      expect(queryByText('Please add a product to your cart before submitting an order')).not.toBeNull();
    });
  });
  
  
  test('Product search and autocomplete functionality', async () => {
    
    const { debug, getByText, getByPlaceholderText,  } = render(
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>
    );
  
    getByPlaceholderText('Enter barcode');
    expect(getByPlaceholderText('Enter barcode').value).toBe(null);
    fireEvent.change(getByPlaceholderText('Enter barcode'), { target: { value: 'CFP-' } });
    fireEvent.click(getByText('Product'));
  
  
    // Emulate retrieving order history from backend with zero orders
    let responseData = {
      "identifiers": [
          { "productCode": "CFP-600-12-LPP-150" },
          { "productCode": "CFP-600-12-LPP-200" },
          { "productCode": "CFP-600-12-LPP-250" }
      ],
      "message": "Successfully retrieved similar barcodes or product codes",
      "status": "success"
    }
  
    mockAxios.get.mockResolvedValue({ data: responseData });
  
    await waitFor(() => {
      // First call for changing input value, second call for changing
      // input type from 'barcode' to 'product code'
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(queryAllByText('CFP-', { exact: false }).length).toBe(4);
    });

    // debug();
  });


  // test('Searching for an invalid barcode', () => {
  //   const { debug, getByText, getByPlaceholderText,  } = render(
  //     <MemoryRouter>
  //       <OrderPage />
  //     </MemoryRouter>
  //   );
  
  //   getByPlaceholderText('Enter barcode');
  //   expect(getByPlaceholderText('Enter barcode').value).toBe(null);
  //   fireEvent.change(getByPlaceholderText('Enter barcode'), { target: { value: '12345' } });
  //   fireEvent.click(getByText('Product'));
    
  // });

});
