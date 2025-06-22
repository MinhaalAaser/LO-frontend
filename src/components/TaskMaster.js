import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../features/modal/addModalSlice';
import TaskRender from './TaskRender';
import AddTaskModal from './modals/AddTaskModal';

function TaskMaster() {
  const isOpen = useSelector((state) => state.addModal.isOpen);
  const firstname = useSelector((state) => state.Auth.firstname);
  const dispatch = useDispatch();
  const userTasks = useSelector((state) => state.Auth.tasks);
  const masterTasks = userTasks.filter((task) => task.category === 'Master');

  return (
    <div className="task-list-wrapper">
      <div className="list-header">
        <h2>{`${firstname}'s tasks `}</h2>
        <h4>Click on the "Add Task" button...</h4>
      </div>

      <div className="master-list-header">
        <button className="add-task-btn" onClick={() => dispatch(openModal())}>
          Add Task
        </button>
        {isOpen && <AddTaskModal />}
      </div>

      <div className="master-list-component">
        {masterTasks.map((tasks) => {
          return <TaskRender key={tasks.task_id} {...tasks} />;
        })}
      </div>
    </div>
  );
}

export default TaskMaster;
