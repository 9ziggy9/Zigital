import React from 'react';
import "./SettingsTree.css";

const SettingsTree = () => {
  return (
    <>
      <div className='btn-list'>
        <div id="act-info">
            <span class="material-icons">
                account_circle
            </span>
          hello
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
