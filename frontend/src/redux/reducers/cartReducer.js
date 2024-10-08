// src/redux/reducers/cartReducer.js

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  };
  
  function cartReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product._id === item.product._id);
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product._id === existItem.product._id ? item : x
            ),
          };
        } else {
          return { ...state, cartItems: [...state.cartItems, item] };
        }
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product._id !== action.payload),
        };
  
      default:
        return state;
    }
  }
  
  export default cartReducer;
  