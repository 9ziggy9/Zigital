import "./Splash.css";
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const Splash = () => {
  return (
    <>
      <div className='navbar'>
        <button id='home-btn' className='home'>
            <NavLink to='/home' exact={true} activeClassName='active'>
              Zigital
            </NavLink>
        </button>
        <button id='login-btn'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
        </button>
        <button id='signup-btn'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
        </button>
            {/* <LogoutButton /> */}
      </div>
      <div className='splash-area'>
        <div className='splash-overlay'>
          <div className='pop-up hidden'>
          </div>
        </div>
      </div>
    </>
  );
}

export default Splash;
