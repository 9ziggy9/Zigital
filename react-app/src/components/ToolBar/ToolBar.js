import React from 'react';
import ComponentsTree from '../ComponentsTree/ComponentsTree'
import "../../index.css"

const ToolBar = () => {
  const toggleMenu = (id, menu) => {
    const menuNode = document.getElementById(menu);
    const buttonNode = document.getElementById(id);
    if (!menuNode.classList.contains("hidden")) {
      menuNode.classList.add("hidden");
      buttonNode.classList.remove('highlight');
      buttonNode.classList.add('unhighlight');
    }
    else {
      menuNode.classList.remove("hidden");
      buttonNode.classList.add('highlight');
      buttonNode.classList.remove('unhighlight');
    }
  }
  return (
    <>
    <div className="toolbar">
      <button id="components-btn"
              onClick={() => toggleMenu('components-btn','components-tree')}>
        <span className="material-icons">
          build
        </span>
      </button>
      <div className="logo">
        zigital
      </div>
      <button id="profile-btn">
        <span className="material-icons">
          settings
        </span>
      </button>
    </div>
    <div className="canvas-overlay">
        <div className="components-area">
            <div id="components-tree" className="hidden">
              <ComponentsTree />
            </div>
        </div>
    </div>
    </>
  )
}

export default ToolBar;
