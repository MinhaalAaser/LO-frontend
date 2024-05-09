import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const deleteModalSlice = createSlice({
  name: 'deletemodal',
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.isOpen = true;
    },
    closeDeleteModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
