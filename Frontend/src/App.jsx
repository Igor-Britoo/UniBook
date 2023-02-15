import React from 'react'
import { HashRouter, Route, Routes } from "react-router-dom";

import './styles/App.css';

import { AuthProvider } from './contexts/AuthContext';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>

          <Route path="/signin/" element= {<SignIn/>} />
          <Route path="/signup/" element= {<SignUp/>} />
          <Route path="/home" element= {<Home/>} />
          
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
