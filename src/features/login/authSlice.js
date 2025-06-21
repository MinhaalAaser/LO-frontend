import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  pwd: '',
  firstname: '',
  lastname: '',
  tasks: [],
  isAuthenticated: false,
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    loginSuccess: (state, action) => {
      const { id, email, firstname, lastname, tasks, token } = action.payload;
      state.isAuthenticated = true;
      state.accessToken = token;
      state.id = id;
      state.email = email;
      state.pwd = '';
      state.firstname = firstname;
      state.lastname = lastname;
      state.tasks = tasks;
    },

    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    resetAuthState: () => initialState,

    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.task_id !== action.payload
      );
    },

    updateUserTaskList: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  updateField,
  loginSuccess,
  refreshAccessToken,
  resetAuthState,
  addTask,
  deleteTask,
  updateUserTaskList,
} = authSlice.actions;
export default authSlice.reducer;
