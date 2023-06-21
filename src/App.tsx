import React from 'react';
import HomePage from './components/HomePage/HomePage';
import { HomePageConfigContextProvider } from './components/HomePageConfigContextProvider/HomePageConfigContextProvider';
import { UserConfigContextProvider } from './components/UserConfigContextProvider/UserConfigContextProvider';

function App() {
  return (<UserConfigContextProvider>
    <HomePageConfigContextProvider>
        <HomePage />
    </HomePageConfigContextProvider>
  </UserConfigContextProvider>);
}

export default App;