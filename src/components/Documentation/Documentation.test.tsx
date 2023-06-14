import React from 'react';
import { render, screen } from '@testing-library/react';
import Documentation from './Documentation';
import { MemoryRouter } from 'react-router-dom';
import { UserConfigContextProvider } from '../UserConfigContextProvider/UserConfigContextProvider';
test('documentation has a link to TM specification', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <Documentation/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    const tmLinkElement = screen.getByText(/Turing Machine Specification/).closest('a');
    expect(tmLinkElement).toHaveAttribute('href', '/documentation/turing-machine/');
});

test('documentation has a link to TML specification', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <Documentation/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    const tmlLinkElement = screen.getByText(/Turing Machine Program Specification/).closest('a');
    expect(tmlLinkElement).toHaveAttribute('href', '/documentation/turing-machine-language/');
});

test('documentation has a link to errors', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <Documentation/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    const errorLinkElement = screen.getByText(/Errors/).closest('a');
    expect(errorLinkElement).toHaveAttribute('href', '/documentation/errors/');
});