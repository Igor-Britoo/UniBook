import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/global';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Book } from './pages/Book';
import { ListBook } from './pages/ListBook';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { PageNotFound } from './pages/PageNotFound'

import { ProfilePagesLayout } from './components/ProfilePagesLayout';
import { NestedRoutesLayout } from './components/NestedRoutesLayout';
import { ProtectedRoutes } from './components/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
    <ThemeProvider theme={theme}>
      
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/signin/" element= {<SignIn/>} />
          <Route path="/signup/" element= {<SignUp/>} />

          <Route path="/" element= {<NestedRoutesLayout />}>

            <Route path="" element={<Home/>} />
            <Route path='books/' element= {<ListBook/>} />
            <Route path='books-best-sellers/' element= {<ListBook/>} />
            <Route path='books-most-viewed/' element= {<ListBook/>} />
            <Route path='books-on-sale/' element= {<ListBook/>} />
            <Route path='books/search/' element= {<ListBook/>} />
            <Route path='books/filter/' element= {<ListBook/>} />
            <Route path="books/:ISBN/" element= {<Book/>} />

            <Route path="" element={<ProtectedRoutes />} >
              <Route path='/' element= {<ProfilePagesLayout />} >
                <Route path="profile/" element={<Profile />} />
                <Route path='orders/' element= {<Orders />} />
              </Route>
            </Route>

            <Route path="*" element={<PageNotFound />}/>
          </Route>

        </Routes>
      </BrowserRouter>

    </ThemeProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
