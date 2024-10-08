// src/redux/actions/productActions.js
import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};
