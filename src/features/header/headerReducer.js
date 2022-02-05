import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false,
};

export const headerReducer = createSlice({
  initialState,
  name: 'headerToggle',
  reducers: {
    toggleFunc: (state) => {
      state.toggle = !state.toggle;
    },
    toggleFalseFunc: (state) => {
      state.toggle = false;
    },
  },
});

export const { toggleFunc, toggleFalseFunc } = headerReducer.actions;

export default headerReducer.reducer;
