import React from 'react';
import {useState} from 'react';
import './ProjectTree.css';
import { useSelector } from 'react-redux';

const ProjectTree = ({setTool, save, setProject}) => {
  const user = useSelector(state => state.session.user);

  const toggleLoad = (menu) => {
    const projectNode = document.getElementById('pr-id');
    const menuNode = document.getElementById(menu);
    if (!menuNode.classList.contains("hidden")) {
      menuNode.classList.add("hidden");
      projectNode.classList.remove("hidden");
    }
    else {
      menuNode.classList.remove("hidden");
      projectNode.classList.add("hidden");
    }
  }

  const saveProject = async () => {
    const res = await fetch(`/api/projects/${user.id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        save: save
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  }

  const getProject = async () => {
    const res = await fetch(`/api/projects/2`)
    if (res.ok) {
      const data = await res.json();
      setProject(data.project.state);
    }
  }

  return (
    <>
      <div id='pr-id' className='btn-list'>
        <button id='save' onClick={saveProject}>
          save project
        </button>
        <button id='load' onClick={() => toggleLoad('load-menu')}>
          load project
        </button>
        <button id='delete'>
          delete project
        </button>
      </div>
      <div id='load-menu' className='btn-list hidden'>
        <div id='project-title'>PROJECTS</div>
        <button className='project-load-button'>
          example 1
        </button>
        <button className='project-load-button'>
          example 2
        </button>
        <button className='project-load-button'>
          example 3
        </button>
        <button className='project-load-button'>
          example 4
        </button>
        <button className='project-load-button'>
          example 5
        </button>
        <button className='project-load-button'>
          example 6
        </button>
        <button className='project-load-button'>
          example 7
        </button>
        <button id='cancel' onClick={() => toggleLoad('load-menu')}>
          cancel
        </button>
      </div>
    </>
  )
}

export default ProjectTree;
