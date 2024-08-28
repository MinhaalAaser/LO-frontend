import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetState,
  updateId,
  updateTasks,
} from '../features/to-do-list/taskSlice';
import { updateUserTaskList } from '../features/login/authSlice';
import { openDeleteModal } from '../features/modal/deleteModalSlice';
import DeleteTaskModal from './modals/DeleteTaskModal';
import { openEditModal } from '../features/modal/editModalSlice';
import EditTaskModal from './modals/EditTaskModal';

function TaskRender(tasks) {
  const dispatch = useDispatch();
  const isDeleteOpen = useSelector((state) => state.deleteModal.isOpen);
  const isEditOpen = useSelector((state) => state.editModal.isOpen);
  const { task_id, user_id, task, category } = tasks;

  const UpdateTasks = () => {
    axios({
      method: 'GET',
      url: `https://api.aaserzypher.dev/life-organized/tasks/get?user_id=${user_id}`,
    })
      .then((response) => {
        const taskResponse = response.data;
        dispatch(updateUserTaskList(taskResponse));
      })
      .catch((error) => console.log(error));
  };

  const handleCompletedButtonClick = ({
    taskId,
    newCategory,
    user_id,
    task,
  }) => {
    dispatch(updateTasks({ taskId, newCategory, user_id, task }));
    axios({
      method: 'PUT',
      url: `https://api.aaserzypher.dev/life-organized/tasks/edit/${taskId}`,
      data: {
        task_id: taskId,
        user_id: user_id,
        task: task,
        category: newCategory,
      },
    })
      .then(() => {
        dispatch(resetState());
        UpdateTasks();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBtnClick = (taskId) => {
    dispatch(updateId(taskId));
    dispatch(openDeleteModal());
  };

  const handleEditButtonClick = ({ task_id, task, user_id, category }) => {
    dispatch(updateTasks({ task_id, user_id, task, category }));
    dispatch(openEditModal());
  };

  return (
    <div className="task-wrapper" draggable>
      <div className="task-render">
        <p>{task}</p>
      </div>

      <div className="task-action-btns-wrapper">
        {category !== 'Completed' && (
          <button
            className="edit-task-btn"
            onClick={() =>
              handleEditButtonClick({ task_id, user_id, task, category })
            }
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        )}
        {isEditOpen && <EditTaskModal />}
        <button
          className="delete-task-btn"
          onClick={() => handleDeleteBtnClick(task_id)}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        {isDeleteOpen && <DeleteTaskModal />}

        {category !== 'Completed' && (
          <button
            className="complete-task-btn"
            onClick={() =>
              handleCompletedButtonClick({
                taskId: task_id,
                newCategory: 'Completed',
                task: task,
                user_id: user_id,
              })
            }
          >
            <span className="material-symbols-outlined">done</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskRender;
