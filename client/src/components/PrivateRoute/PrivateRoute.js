import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from "../../context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useAuth();
    
    return (
        <Route
          {...rest}
          render={props =>
            state.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
}

export default PrivateRoute;