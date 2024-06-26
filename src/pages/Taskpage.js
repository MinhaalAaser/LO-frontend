import React from 'react';
import TaskMaster from '../components/TaskMaster';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTaskList } from '../features/login/authSlice';
import TaskCategory from '../components/TaskCategory';

const TaskPage = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.Auth.id);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://salazarthorn.tplinkdns.com/tasks/get?user_id=${user_id}`,
    })
      .then((response) => {
        const taskResponse = response.data;
        dispatch(updateUserTaskList(taskResponse));
      })
      .catch((error) => console.log(error));
  });

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
