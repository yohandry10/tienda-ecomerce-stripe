// src/redux/actions/cartActions.js

export const addToCart = (product, quantity) => (dispatch, getState) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
      },
    });
  
    // Guardar el carrito en localStorage
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
  
  export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
  
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };
  