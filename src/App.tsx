import React from 'react';
import { purple, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './components/HomePage/HomePage';
import AppDrawer from './components/AppDrawer/AppDrawer';
import { HomePageConfigContextProvider } from './components/HomePageConfigContextProvider/HomePageConfigContextProvider';
import { UserConfigContextProvider } from './components/UserConfigContextProvider/UserConfigContextProvider';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[600],
    },
    secondary: {
      main: green[300]
    }
  }
});

// TODO: Create both light and dark themes

function App() {
  return (<UserConfigContextProvider>
    <HomePageConfigContextProvider>
        <ThemeProvider theme={theme}>
          <div className="app">
            <AppDrawer/>
            <HomePage/>
          </div>
        </ThemeProvider>
    </HomePageConfigContextProvider>
  </UserConfigContextProvider>);
}

export default App;