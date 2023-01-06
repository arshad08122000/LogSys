/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Home from './components/Home.jsx';
import Signin from './components/sign-in.jsx';
import Signup from './components/sign-up.jsx';
import Navbar from './components/navbar';
import UserDetails from './components/userdetails' 
import Forget from './components/resetpassword'
import GoogleOneTap from './components/googleOneTap'


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
 } from "react-router-dom";
 

function App() {
  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<GoogleOneTap/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/user-profile' element={<UserDetails/>}/>
      <Route path='/forget' element={<Forget/>}/>
      <Route path='/home' element={<Home/>}/>

      </Routes>
    </Router>
  );
}

export default App;
