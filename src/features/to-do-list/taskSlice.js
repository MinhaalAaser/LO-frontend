import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task_id: null,
  user_id: null,
  task: '',
  category: 'Master',
};

const taskSlice = createSlice({
  name: 'tasklist',
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      const { task_id, task, category } = action.payload;
      state.task_id = task_id;
      state.task = task;
      state.category = category;
    },

    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    updateCategory: (state, action) => {
      const { taskId, newCategory } = action.payload;
      console.log(taskId, newCategory);
      return {
        ...state,
        task_id: taskId,
        category: newCategory,
      };
    },

    resetState: (state) => {
      return initialState;
    },

    updateId: (state, action) => {
      const task_id = action.payload;
      state.task_id = task_id;
    },
  },
});

export const {
  updateField,
  resetState,
  updateCategory,
  updateTasks,
  updateId,
} = taskSlice.actions;
export default taskSlice.reducer;
