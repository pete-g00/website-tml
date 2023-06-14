import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ErrorDocumentation from './ErrorDocumentation';
import { UserConfigContextProvider } from '../UserConfigContextProvider/UserConfigContextProvider';

test("The page should have a link for unexpected-eof", () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <ErrorDocumentation />
        </UserConfigContextProvider>
    </MemoryRouter>);
    const eofElement = screen.getByText('Unexpected End Of File').closest("a");
    expect(eofElement).toHaveAttribute('href', '/documentation/errors/unexpected-eof');
});