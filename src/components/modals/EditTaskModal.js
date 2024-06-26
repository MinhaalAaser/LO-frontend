import ReactModal from 'react-modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditModal } from '../../features/modal/editModalSlice';
import { resetState, updateField } from '../../features/to-do-list/taskSlice';
import { updateUserTaskList } from '../../features/login/authSlice';

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const { task_id, user_id, task, category } = useSelector(
    (state) => state.Task
  );
  const isOpen = useSelector((state) => state.editModal.isOpen);

  const handleCloseModal = () => {
    dispatch(closeEditModal());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({ name: name, value }));
  };

  const handlePressReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const UpdateTasks = () => {
    axios({
      method: 'GET',
      url: `https://salazarthorn.tplinkdns.com/tasks/get?user_id=${user_id}`,
    })
      .then((response) => {
        const taskResponse = response.data;
        dispatch(updateUserTaskList(taskResponse));
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'PUT',
      url: `https://salazarthorn.tplinkdns.com/tasks/edit/${task_id}`,
      data: {
        task_id: task_id,
        user_id: user_id,
        task: task,
        category: category,
      },
    })
      .then(() => {
        UpdateTasks();
        dispatch(resetState());
        dispatch(closeEditModal());
      })
      .catch((error) => console.log(error));
  };

  return (
    <ReactModal
      style={{
        overlay: {
          position: 'fixed',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '300px',
          width: '450px',
          backgroundColor: 'inherit',
        },

        content: {
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'solid 2px #0b0c10',
          boxShadow: '0 0 10px #66fcf1',
          background: '#c5c6c7',
        },
      }}
      onRequestClose={handleCloseModal}
      isOpen={isOpen}
      ariaHideApp={false}
    >
      <div className="edit-modal">
        <h3 className="modal-heading">Edit Task</h3>
        <input
          className="edit-task-field"
          type="text"
          onChange={handleChange}
          name="task"
          placeholder="Edit task"
          value={task}
          onKeyDown={handlePressReturn}
        />

        <label>
          Pick a category:
          <select
            onChange={handleChange}
            className="category-picker"
            name="category"
            value={category}
          >
            <option value={'Master'}>Master</option>
            <option className="critical" value={'Critical'}>
              Critical
            </option>
            <option className="priority" value={'Priority'}>
              Priority
            </option>
            <option className="routine" value={'Routine'}>
              Routine
            </option>
          </select>
        </label>

        <button className="edit-modal-submit" onClick={handleSubmit}>
          Submit Changes
        </button>
      </div>
    </ReactModal>
  );
};
export default EditTaskModal;
