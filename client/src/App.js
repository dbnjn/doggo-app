import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Admin from "./components/Admin/Admin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthContext, initialState, reducer } from "./context/auth";

const App = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token') || null;

    if(token){
      dispatch({
        type: 'LOGIN',
        payload: {
          token
        }
      })
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/admin" component={Admin} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
