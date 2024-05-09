import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  pwd: '',
  firstname: '',
  lastname: '',
  tasks: [],
  isAuthenticated: false,
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
      const { id, email, firstname, lastname, tasks } = action.payload;
      state.isAuthenticated = true;
      state.id = id;
      state.email = email;
      state.pwd = '';
      state.firstname = firstname;
      state.lastname = lastname;
      state.tasks = tasks;
    },

    resetAuthState: (state) => {
      return initialState;
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.task_id !== action.payload),
      };
    },

    updateUserTaskList: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    },
  },
});

export const {
  updateField,
  loginSuccess,
  resetAuthState,
  addTask,
  deleteTask,
  updateUserTaskList,
} = authSlice.actions;
export default authSlice.reducer;
