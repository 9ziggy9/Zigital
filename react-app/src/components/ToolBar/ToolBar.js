import React from 'react';
import ComponentsTree from '../ComponentsTree/ComponentsTree';
import ProjectTree from '../ProjectTree/ProjectTree';
import SettingsTree from '../SettingsTree/SettingsTree';
import "../../index.css"

const ToolBar = ({setTool}) => {
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
      <button id="profile-btn"
              onClick={() => toggleMenu('profile-btn','settings-tree')}>
        <span className="material-icons">
          settings
        </span>
      </button>
      <button id="project-btn"
              onClick={() => toggleMenu('project-btn','project-tree')}>
        <span className="material-icons">
          save
        </span>
      </button>
    </div>
    <div className="canvas-overlay">
        <div className="components-area">
            <div id="components-tree" className="hidden">
              <ComponentsTree setTool={setTool}/>
            </div>
        </div>
    </div>
    <div className="canvas-overlay">
        <div className="components-area">
            <div id="project-tree" className="hidden">
              <ProjectTree setTool={setTool}/>
            </div>
        </div>
    </div>
    <div className="canvas-overlay">
        <div className="settings-area">
          <div id="settings-tree" className="hidden">
            <SettingsTree />
          </div>
        </div>
    </div>
    </>
  )
}

export default ToolBar;
