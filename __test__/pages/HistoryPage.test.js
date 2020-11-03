import React from 'react';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter } from 'react-router-dom';
import 'babel-polyfill';

// Page to test
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


describe('Testing <HistoryPage />', () => {

  test('Test order history page', async () => {
    sessionStorage.setItem('user', 'user');
  
    const { getByText } = render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );
  
    // Ensure 'Recent Orders' is rendered when page renders initially
    await waitFor(() => getByText('Recent Orders'));
  
    // Emulate retrieving order history from backend with zero orders
    mockAxios.get.mockResolvedValueOnce({
      data: {
        message: "Successfully retrieved order history",
        orders: [],
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

    // Ensure the order history table is rendered
    const table = await screen.findByRole('table');
    expect(table).not.toBe(null);

    // Ensure 'No Data' appears in the table, since we have zero orders
    const tableData = await screen.findByText('No Data');
    expect(tableData).toBeInTheDocument();
  })
});