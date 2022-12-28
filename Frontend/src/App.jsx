import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/App.css';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/signin/" element= {<SignIn/>} />
        <Route path="/signup/" element= {<SignUp/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
