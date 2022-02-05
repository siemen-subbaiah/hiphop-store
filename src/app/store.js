import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import cartReducer from '../features/cart/cartReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
