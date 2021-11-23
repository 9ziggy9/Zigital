import { useSelector } from 'react-redux';
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
          about
        </button>
        <button id="delete-act">
          user settings
        </button>
        <button id="logout-act">
          logout
        </button>
      </div>
    </>
  )
}

export default SettingsTree;
