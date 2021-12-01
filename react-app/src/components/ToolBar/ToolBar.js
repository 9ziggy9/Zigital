import React from 'react';
import ComponentsTree from '../ComponentsTree/ComponentsTree';
import ProjectTree from '../ProjectTree/ProjectTree';
import About from '../About/About';
import SettingsTree from '../SettingsTree/SettingsTree';
import {useState, useEffect} from 'react';
import "../../index.css";
import "../About/About.css";

const ToolBar = ({setTool, save, setProject}) => {
  const [about,setAbout] = useState(0);
  const rhsMenus = ['components-tree', 'project-tree'];
  const rhsIds = ['components-btn', 'project-btn'];
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
    rhsMenus.filter(m => m !== menu)
            .forEach(m => {
              const other = document.getElementById(m);
              other.classList.add("hidden");
            })
    rhsIds.filter(i => i !== id)
            .forEach(i => {
              const other = document.getElementById(i);
              other.classList.remove("highlight");
              other.classList.add("unhighlight");
            })
  }

  useEffect(() => {
    if (about === 1) {
      const aboutNode = document.getElementById('about-box')
      const settingsNode = document.getElementById('settings-tree')
      const settingsBtn = document.getElementById('profile-btn')
      const componentsBtn = document.getElementById('components-btn')
      const projectBtn = document.getElementById('project-btn')
      if (aboutNode.classList.contains("hidden")) {
        aboutNode.classList.remove("hidden");
        settingsNode.classList.add("hidden");
        settingsBtn.classList.add("unclickable");
        settingsBtn.classList.remove("highlight");
        componentsBtn.classList.add("unclickable");
        projectBtn.classList.add("unclickable");
      } else {
        aboutNode.classList.add("hidden");
        settingsBtn.classList.remove("unclickable");
        componentsBtn.classList.remove("unclickable");
        projectBtn.classList.remove("unclickable");
      }
    }
  }, [about])

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
              <ProjectTree setTool={setTool} save={save} setProject={setProject}/>
            </div>
        </div>
    </div>
    <div className="canvas-overlay">
        <div className="settings-area">
          <div id="settings-tree" className="hidden">
            <SettingsTree setAbout={setAbout}/>
          </div>
        </div>
    </div>
    <div className="canvas-overlay">
        <div className="about-area">
          <div id="about-box" className="hidden">
            <About setAbout={setAbout}/>
          </div>
        </div>
    </div>
    </>
  )
}

export default ToolBar;
