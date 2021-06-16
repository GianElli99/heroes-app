import React from 'react';

export const LoginScreen = ({ history }) => {
  const handleClick = (e) => {
    history.replace('/');
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
