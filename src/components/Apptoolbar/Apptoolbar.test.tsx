import React from 'react';
import { render, screen } from '@testing-library/react';
import AppToolbar from './Apptoolbar';
import { MemoryRouter } from 'react-router-dom';
import { UserConfigContextProvider } from '../UserConfigContextProvider/UserConfigContextProvider';

test('renders link to documentation in homescreen', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <AppToolbar/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    const docLinkElement = screen.getByText(/Documentation/);
    expect(docLinkElement).toHaveAttribute('href', '/documentation');
});

test('doesn\'t render link to homescreen in homescreen', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <AppToolbar/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    expect(() => {
        screen.getByText(/Editor/);
    }).toThrow();
});

test('renders link to homescreen in documentation', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <AppToolbar isDocumentation/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    const editorLinkElement = screen.getByText(/Editor/);
    expect(editorLinkElement).toHaveAttribute('href', '/');
});

test('doesn\'t render link to documentation in homescreen', () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <AppToolbar isDocumentation/>
        </UserConfigContextProvider>
    </MemoryRouter>);
    expect(() => {
        screen.getByText(/Documentation/);
    }).toThrow();
});