import React from 'react';
import './ProjectTree.css';
import { useSelector } from 'react-redux';
import {Project} from '../../logic/classes/project';

const ProjectTree = ({setTool, save}) => {
  const user = useSelector(state => state.session.user);

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
    const res = await fetch(`/api/projects/1`)
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  }

  return (
    <>
      <div className='btn-list'>
        <button id='save' onClick={saveProject}>
          save project
        </button>
        <button id='load' onClick={getProject}>
          load project
        </button>
        <button id='delete'>
          delete project
        </button>
      </div>
    </>
  )
}

export default ProjectTree;
