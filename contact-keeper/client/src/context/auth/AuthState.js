import React, { useReducer, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.error("LoadUser error:", error.response?.data);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      if (res.data.token) {
        setAuthToken(res.data.token);
        await loadUser();
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data.msg || "Registration failed",
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, []);

  // login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      if (res.data.token) {
        setAuthToken(res.data.token);
        await loadUser();
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data.msg || "Login failed",
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, []);

  // logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
