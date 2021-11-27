import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import '../SettingsTree/SettingsTree.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <button id="logout-act" onClick={onLogout}>
      logout
    </button>
  )
};

export default LogoutButton;
