import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import React from 'react';
import "./SettingsTree.css";

const SettingsTree = () => {
  const user = useSelector(state => state.session.user);

  return (
    <>
      <div className='btn-list'>
        <div id="act-info">
            <span className="material-icons">
                account_circle
            </span>
            <div className='lil-pad'>
                {user?.email}
            </div>
        </div>
        <button id="about">
          <a href="https://github.com/9ziggy9/Zigital">about</a>
        </button>
        <button id="delete-act">
          user settings
        </button>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <LogoutButton />
          </NavLink>
      </div>
    </>
  )
}

export default SettingsTree;
