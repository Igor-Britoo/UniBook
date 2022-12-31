import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/App.css';

import { AuthProvider } from './contexts/AuthContext';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/signin/" element= {<SignIn/>} />
          <Route path="/signup/" element= {<SignUp/>} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
