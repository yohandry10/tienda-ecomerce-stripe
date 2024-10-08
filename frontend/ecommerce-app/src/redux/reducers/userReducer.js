// src/redux/reducers/userReducer.js

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: null,
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
        return { ...state, loading: true };
      case 'USER_LOGIN_SUCCESS':
        return { userInfo: action.payload, loading: false };
      case 'USER_LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'USER_LOGOUT':
        return { userInfo: null };
      default:
        return state;
    }
  }
  
  export default userReducer;
  