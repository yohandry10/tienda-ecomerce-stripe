// src/redux/store.js
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk'; // Corrección aquí

// Importa tus reducers aquí
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  // Agrega otros reductores según sea necesario
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
