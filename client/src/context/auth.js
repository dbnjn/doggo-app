import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("token", action.payload.userToken);
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.userToken
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };

export const useAuth = () => {
  return useContext(AuthContext);
};