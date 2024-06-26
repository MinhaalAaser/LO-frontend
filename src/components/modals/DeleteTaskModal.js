import axios from 'axios';
import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteModal } from '../../features/modal/deleteModalSlice';
import { deleteTask } from '../../features/login/authSlice';
import { resetState } from '../../features/to-do-list/taskSlice';

const DeleteTaskModal = () => {
  const task_id = useSelector((state) => state.Task.task_id);
  const isDeleteOpen = useSelector((state) => state.deleteModal.isOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleConfirmDelete = async (event) => {
    event.preventDefault();
    axios({
      method: 'DELETE',
      url: `https://salazarthorn.tplinkdns.com/tasks/delete/${task_id}`,
    })
      .then((response) => {
        dispatch(deleteTask(task_id));
        dispatch(resetState());
        dispatch(closeDeleteModal());
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
          backgroundColor: 'inherit',
        },

        content: {
          margin: '0',
          padding: '0',
          backgroundColor: '#c5c6c7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'solid 2px #0b0c10',
          boxShadow: '0 0 10px #66fcf1',
        },
      }}
      onRequestClose={handleCloseModal}
      isOpen={isDeleteOpen}
      ariaHideApp={false}
    >
      <div className="delete-task-modal">
        <div className="modal-text">
          <p>Delete Task?</p>
        </div>

        <div className="modal-buttons">
          <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
            Confirm
          </button>
          <button
            className="delete-cancel-btn"
            onClick={() => dispatch(closeDeleteModal())}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteTaskModal;
