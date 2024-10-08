// src/redux/actions/userActions.js

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password }, config);
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAILURE',
      payload: error.response && error.response.data.msg ? error.response.data.msg : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: 'USER_REGISTER_REQUEST' });
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password }, config);
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAILURE',
      payload: error.response && error.response.data.msg ? error.response.data.msg : error.message,
    });
  }
};
