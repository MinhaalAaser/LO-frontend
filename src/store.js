import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/login/authSlice';
import taskReducer from './features/to-do-list/taskSlice';
import addModalReducer from './features/modal/addModalSlice';
import editModalReducer from './features/modal/editModalSlice';
import deleteModalReducer from './features/modal/deleteModalSlice';

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    Task: taskReducer,
    addModal: addModalReducer,
    editModal: editModalReducer,
    deleteModal: deleteModalReducer,
  },
});
