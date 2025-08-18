import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    userLogin: userReducer, // Renaming to userLogin for clarity in components
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in development
});

export default store;

