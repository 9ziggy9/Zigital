import React from 'react';
import "../../index.css"

const ToolBar = () => {
  return (
    <div className="toolbar">
      <div className="components-btn">
        <span class="material-icons">
          build
        </span>
      </div>
      <div className="logo">
        zigital
      </div>
      <div className="profile-btn">
        <span class="material-icons">
          settings
        </span>
      </div>
    </div>
  )
}

export default ToolBar;
