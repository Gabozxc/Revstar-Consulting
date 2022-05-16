import axios from 'axios';

import {
  NEW_ACCOUNT,
  NEW_ACCOUNT_FAILURE,
  NEW_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT,
  LOGIN_ACCOUNT_FAILURE,
  LOGIN_ACCOUNT_SUCCESS,
  CHECK_TOKEN,
  CHECK_TOKEN_FAILURE,
  CHECK_TOKEN_SUCCESS,
  LOG_OUT,
  CLEAN_ALERT
} from "../types/userTypes.js";

export const newAccount = (user) => {
  return async (dispatch) => {
    dispatch(creatingNewAccount());
    try {
      const newUser = await axios.post('/api/user/newUser', user);
      dispatch(newAccountSuccess(newUser.data));
    } catch (err) {
      console.log(err)
      return dispatch(newAccountFailure(err?.response?.data));
    }
  };
};

const creatingNewAccount = () => ({
  type: NEW_ACCOUNT,
})

const newAccountSuccess = (data) => ({
  type: NEW_ACCOUNT_SUCCESS,
  payload: data
})

const newAccountFailure = (data) => ({
  type: NEW_ACCOUNT_FAILURE,
  payload: data
})

export const LogIn = (user) => {
  return async (dispatch) => {
    dispatch(loginAccount());
    try {
      const userdata = await axios.post('/api/user/login', user);
      dispatch(loginAccountSuccess(userdata.data));
      return localStorage.setItem("token", userdata.data.accessToken);
    } catch (err) {
      return dispatch(loginAccountFailure(err?.response?.data));
    }
  };
};

const loginAccount = () => ({
  type: LOGIN_ACCOUNT,
})

const loginAccountSuccess = (data) => ({
  type: LOGIN_ACCOUNT_SUCCESS,
  payload: data
})

const loginAccountFailure = (data) => ({
  type: LOGIN_ACCOUNT_FAILURE,
  payload: data
})

export const CheckToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(checkingToken());
    try {
      const usuario = await axios.post("/api/auth/checkToken", {token});
      usuario.data.data.user.token = token
      dispatch(checkTokenSuccess(usuario.data.data));
      return true
    } catch (err) {
      return dispatch(errorCheckingToken(err?.response?.data));
    }
  };
};

const checkingToken = () => ({
  type: CHECK_TOKEN,
});

const checkTokenSuccess = (data) => ({
  type: CHECK_TOKEN_SUCCESS,
  payload: data,
});

const errorCheckingToken = (err) => ({
  type: CHECK_TOKEN_FAILURE,
  payload: err,
});

export const LogOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: LOG_OUT,
    });
  };
};

export const cleanAlert = () => ({
  type: CLEAN_ALERT
})