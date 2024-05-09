import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const editModalSlice = createSlice({
  name: 'editmodal',
  initialState,
  reducers: {
    openEditModal: (state, action) => {
      state.isOpen = true;
    },
    closeEditModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openEditModal, closeEditModal } = editModalSlice.actions;

export default editModalSlice.reducer;
