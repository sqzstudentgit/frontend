import React, { Children } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import 'babel-polyfill';

import ErrorMessage from '../../src/components/errorMessage'

jest.mock('axios')

describe('errorMessage component', () => {
    it('render message with according message', async () => {

        render(<ErrorMessage massage='test error occure' />)
        expect(screen.getByText('test error occure')).toBeInTheDocument()

    })
})
