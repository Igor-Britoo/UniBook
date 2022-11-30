import React from 'react'
import { Routes, Route, } from "react-router-dom";

import './styles/App.css';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/signin" element= {<SignIn/>} />
      <Route path="/signup" element= {<SignUp/>} />
    </Routes>
  );
}

export default App;
