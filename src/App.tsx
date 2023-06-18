import React from 'react';
import { purple, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LinkProps } from '@mui/material';
import { Link as RouterLink, LinkProps as RouterLinkProps, Route, Routes, Navigate, HashRouter as Router } from 'react-router-dom';
import HomePage from './components/Homepage/Homepage';
import Documentation from './components/Documentation/Documentation';
import ErrorDocumentation from './components/ErrorDocumentation/ErrorDocumentation';
import PreciseErrorDocumentation from './components/PreciseErrorDocumentation/PreciseErrorDocumentation';
import AppDrawer from './components/AppDrawer/AppDrawer';
import TMDocumentation from './components/TMDocumentation/TMDocumentation';
import TMLDocumentation from './components/TMLDocumentation/TMLDocumentation';
import { UserConfigContextProvider } from './components/UserConfigContextProvider/UserConfigContextProvider';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>((props, ref) => {
    const { href, ...other } = props;
    return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[600],
    },
    secondary: {
      main: green[300]
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

function App() {
  return (<UserConfigContextProvider>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Router>
          <AppDrawer/>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/documentation' element={<Documentation/>} />
              <Route path='/documentation/errors/:label' element={<PreciseErrorDocumentation/>} />
              <Route path='/documentation/errors' element={<ErrorDocumentation/>} />
              <Route path='/documentation/turing-machine' element={<TMDocumentation/>} />
              <Route path='/documentation/turing-machine-language' element={<TMLDocumentation />} />
              <Route path='*' element={<Navigate replace to='/'></Navigate>}></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
  </UserConfigContextProvider>);
}

export default App;