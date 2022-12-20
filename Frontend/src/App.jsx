import React from 'react'
import { Routes, Route, } from "react-router-dom";

import './styles/App.css';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/signin" element= {<SignIn/>} />
      <Route path="/signup" element= {<SignUp/>} />
      <Route path="/home" element= {<Home/>} />
    </Routes>
  );
}

export default App;
