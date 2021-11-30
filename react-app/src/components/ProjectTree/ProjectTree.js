import React from 'react';
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import './ProjectTree.css';
import { useSelector } from 'react-redux';
import { saveProject, getProjects } from '../../store/session';

const ProjectTree = ({setTool, save, setProject}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const projects = useSelector(state => state.session.projects);
  const [projectTitle, setProjectTitle] = useState('project title');
  const [projectDesc, setProjectDesc] = useState('project description');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    (async() => {
      await dispatch(getProjects());
    })();
  }, [dispatch, refresh]);

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

  const updateProjectTitle = (e) => {
    e.preventDefault();
    setProjectTitle(e.target.value);
  };

  const updateProjectDesc = (e) => {
    e.preventDefault();
    setProjectDesc(e.target.value);
  };

  const saveProjectA = async () => {
    const data = await dispatch(saveProject(user.id, save,
                                            projectTitle, projectDesc));
    setRefresh(n => n + 1);
    toggleLoad('save-menu');
  }

  return (
    <>
      <div id='pr-id' className='btn-list'>
        <button id='save' onClick={() => toggleLoad('save-menu')}>
          save project
        </button>
        <button id='load' onClick={() => toggleLoad('load-menu')}>
          load project
        </button>
        <button id='delete' onClick={() => toggleLoad('delete-menu')}>
          delete project
        </button>
      </div>
      <div id='load-menu' className='btn-list hidden'>
        <div id='project-title'>PROJECTS</div>
        {projects && projects.map(p => (
          <button className='project-load-button' key={`prj-${p.id}`}>
            {p.title}
          </button>
        ))};
        <button id='cancel' onClick={() => toggleLoad('load-menu')}>
          cancel
        </button>
      </div>
      <div id='save-menu' className='btn-list hidden'>
        <div id='project-title'>SAVE PROJECT</div>
        <div className='login-form-field'>
          <input
            className='save-project-inputs'
            name='project_title'
            type='text'
            placeholder='project title'
            value={projectTitle}
            onChange={updateProjectTitle}
          />
          <textarea
            name='project_desc'
            type='text'
            placeholder='short description'
            rows='6'
            value={projectDesc}
            onChange={updateProjectDesc}
          ></textarea>
        </div>
        <button id='project-save' onClick={() => saveProjectA()}>
          save
        </button>
        <button id='cancel' onClick={() => toggleLoad('save-menu')}>
          cancel
        </button>
      </div>
      <div id='delete-menu' className='btn-list hidden'>
        <div id='delete-title'>Are you sure you want to delete?</div>
        <button id='cnf-del'>yes, delete</button>
        <button id='cancel' onClick={() => toggleLoad('delete-menu')}>
          cancel
        </button>
      </div>
    </>
  )
}

export default ProjectTree;
