/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
 return(
<nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <Link class="navbar-brand fw-bold fs-4 text-primary" to={'/home'}>LoginSys</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse px-5" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto fw-bold  mb-2 fs-5 mb-lg-0">
        <li class="nav-item text-white px-4">
        <Link class="nav-link text-white" to={'/home'}>Home</Link>
        </li>
        <li class="nav-item px-4">
          <Link class="nav-link text-white" to={'/sign-up'}>SignUp</Link>
        </li>
        <li class="nav-item px-4">
          <Link class="nav-link text-white" to={'/sign-in'}>LogIn</Link>
        </li>
        <li class="nav-item px-4">
          <Link class="nav-link text-white" to={'/forget'}>Forgot Password</Link>
        </li>
      </ul>
    </div>
  </div>
</nav> )
};

export default Navbar;