import './login.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login-form'>
      <div className="column1"></div>
      <div className="login-center">
        <div className='login-text'>
          <h2>
            zigital
          </h2>
          <p>
            A primitive digital logic simulator
          </p>
          <p>
            Please login or select demo to proceed.
          </p>
        </div>
        <div className="login-form-field">
          <form onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
                <button type='submit'>login</button>
                <button onClick={()=>demoLogin()}>demo</button>
              <div className='login-text subtext'>
                <p>
                  See navbar to sign up for a free account.
                </p>
              </div>
          </form>
        </div>
      </div>
      <div className="column3"></div>
    </div>
  );
};

export default LoginForm;
