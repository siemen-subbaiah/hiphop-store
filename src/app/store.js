import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import cartReducer from '../features/cart/cartReducer';
import headerReducer from '../features/header/headerReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    headerToggle: headerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
