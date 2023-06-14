import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PreciseErrorDocumentation from './PreciseErrorDocumentation';
import { UserConfigContextProvider } from '../UserConfigContextProvider/UserConfigContextProvider';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({label: 'unexpected-eof'}),
    useNavigate: () => ((val:string) => {throw val;})
}));

test("When a valid route is given, the page shows the right page", () => {
    render(<MemoryRouter>
        <UserConfigContextProvider>
            <PreciseErrorDocumentation />
        </UserConfigContextProvider>
    </MemoryRouter>);
    expect(document.title).toBe("TML Errors- Unexpected End Of File");
});