import React from 'react';
import './ProjectTree.css';
import { useSelector } from 'react-redux';

const ProjectTree = ({setTool}) => {
  const user = useSelector(state => state.session.user);

  const saveProject = async () => {
    console.log('hello click');
    const res = await fetch(`/api/projects/${user.id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hello: 'world'
      }),
    });
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
