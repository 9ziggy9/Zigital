import React from 'react';
import './ProjectTree.css';

const ProjectTree = ({setTool}) => {
  return (
    <>
      <div className='btn-list'>
        <button id='save'>
          save project
        </button>
        <button id='load'>
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
