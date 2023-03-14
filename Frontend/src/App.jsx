import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/global';

import { AuthProvider } from './contexts/AuthContext';

import { Footer } from './components/Footer';
import { Navbar } from "./components/Navbar";

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Book } from './pages/Book';
import { ListBook } from './pages/ListBook';

function App() {
  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/signin/" element= {<SignIn/>} />
          <Route path="/signup/" element= {<SignUp/>} />
          <Route path="/" element= {<><Navbar/><Home/><Footer/></>} />
          <Route path="/books/:ISBN/" element= {<><Navbar/><Book/><Footer/></>} />
          <Route path='/list' element= {<><Navbar/><ListBook/><Footer/></>} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
