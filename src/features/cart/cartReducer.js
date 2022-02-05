import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems:
    typeof window !== 'undefined' && localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
};

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.cartItems.find(
        (x) => x.productId === action.payload.productId
      );

      existItem
        ? (state.cartItems = state.cartItems.map((x) =>
            x.productId === existItem.productId ? action.payload : x
          ))
        : (state.cartItems = [...state.cartItems, action.payload]);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    increaseItems: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    decreaseItems: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, qty: item.qty === 1 ? item.qty : item.qty - 1 };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    deleteItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  clearCart,
  deleteItems,
  increaseItems,
  decreaseItems,
  getTotal,
} = cartReducer.actions;

export default cartReducer.reducer;
