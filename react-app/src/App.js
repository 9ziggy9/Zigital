import "./index.css";
import "./components/Splash/Splash.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Splash from './components/Splash/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
// Development Component
import Dev from './components/Dev/Dev';
// Development Component
import Home from './components/Home/Home';
import ToolBar from './components/ToolBar/ToolBar';
import { authenticate } from './store/session';

function App() {
  // User authorization, login loading params
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // TOOL BAR STATE //
  const [tool, setTool] = useState('black');
  const [save, setSave] = useState(null);
  const [project, setProject] = useState(null);


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <div className="app-container">
            <Splash />
              <div className='splash-area'>
                <div className='splash-overlay'>
                  <div className='pop-up'>
                    <LoginForm />
                  </div>
                </div>
              </div>
          </div>
        </Route>
        <Route path='/sign-up' exact={true}>
          <div className="app-container">
            <Splash />
              <div className='splash-area'>
                <div className='splash-overlay'>
                  <div className='pop-up'>
                    <SignUpForm />
                  </div>
                </div>
              </div>
          </div>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <div className="app-container">
            <Splash />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <div className="app-container">
            <ToolBar setTool={setTool} save={save} setProject={setProject}/>
            <Home tool={tool}
                  save={save}
                  project={project}
                  setSave={setSave} />
          </div>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
