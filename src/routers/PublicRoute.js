import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  console.log(rest.location.pathname);
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
