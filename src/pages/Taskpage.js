import React from 'react';
import TaskMaster from '../components/TaskMaster';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTaskList } from '../features/login/authSlice';
import TaskCategory from '../components/TaskCategory';
import { apiWithAutoRefresh } from '../utils/tokenRefresh';

const TaskPage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.Auth.id);
  const accessToken = useSelector((state) => state.Auth.accessToken);

  useEffect(() => {
    apiWithAutoRefresh({
      method: 'GET',
      url: `https://api.aaserzypher.dev/life-organized/tasks/get`,
      withCredentials: true,
    })
      .then((response) => {
        const taskResponse = response.data;
        dispatch(updateUserTaskList(taskResponse));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="task-page-wrapper">
      <div className="master-list-wrapper">
        <h2 className="list-heading">To-Do Lists</h2>
        <TaskMaster />
      </div>

      <div className="category-list-wrapper">
        <div className="critical-list">
          <TaskCategory category="Critical" />
        </div>
        <div className="priority-list">
          <TaskCategory category="Priority" />
        </div>
        <div className="routine-list">
          <TaskCategory category="Routine" />
        </div>
      </div>

      <div className="completed-list">
        <TaskCategory category="Completed" />
      </div>
    </div>
  );
};

export default TaskPage;
