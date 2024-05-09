import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const addModalSlice = createSlice({
  name: 'addmodal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = addModalSlice.actions;

export default addModalSlice.reducer;
