import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { closeModal } from '../../features/modal/addModalSlice';
import { resetState, updateField } from '../../features/to-do-list/taskSlice';
import { addTask } from '../../features/login/authSlice';
import { apiWithAutoRefresh } from '../../utils/tokenRefresh';

const AddTaskModal = () => {
  const user_id = useSelector((state) => state.Auth.id);
  const isOpen = useSelector((state) => state.addModal.isOpen);
  const { task } = useSelector((state) => state.Task);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    apiWithAutoRefresh({
      method: 'POST',
      url: 'https://api.aaserzypher.dev/life-organized/tasks/add',
      data: { task },
      withCredentials: true,
    })
      .then((response) => {
        const newTask = response.data;
        dispatch(addTask(newTask));
        dispatch(closeModal());
        dispatch(resetState());
      })
      .catch((error) => console.log('error adding task', error));
  };

  const handlePressReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({ name: name, value }));
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
      <div className="task-modal-container">
        <div className="modal-heading">
          <h4>Add a Task</h4>
        </div>
        <div className="modal-fields">
          <input
            type="text"
            onChange={handleChange}
            name="task"
            placeholder="New to-do item"
            value={task}
            onKeyDown={handlePressReturn}
          />
        </div>
        <button className="modal-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ReactModal>
  );
};

export default AddTaskModal;
