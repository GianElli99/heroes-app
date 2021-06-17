import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    const user = { name: 'Gianfranco' };
    dispatch({ type: types.login, payload: user });

    const lastPath = localStorage.getItem('lastPath') || '/';
    history.replace(lastPath);
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <button className="btn btn-primary" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};
