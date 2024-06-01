import { useSelector } from 'react-redux';
import TaskRender from './TaskRender';

const TaskCategory = ({ category }) => {
  const categoryClass =
    category === 'Critical'
      ? 'critical'
      : category === 'Priority'
      ? 'priority'
      : category === 'Routine'
      ? 'routine'
      : 'completed-tasks';

  const userTasks = useSelector((state) => state.Auth.tasks);
  const categoryTasks = userTasks.filter((task) => task.category === category);

  // const handleDragLeave = (event) => {
  //   event.preventDefault();
  // };
  // const handleDragOver = (event) => {
  //   event.preventDefault();
  // };
  // const handleDragEnter = (event) => {
  //   event.preventDefault();
  // };

  // const handleTaskDrop = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  // };

  return (
    <div
      className={`task-category-list-wrapper ${categoryClass}`}
      // onDrop={handleTaskDrop}
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      // onDragEnter={handleDragEnter}
    >
      <div className="list-header">
        <h2>{`${category} tasks `}</h2>
        {/* <h4>Drag and drop tasks based on urgency...</h4> */}
      </div>

      <div className="list-component">
        {categoryTasks.map((tasks) => {
          return <TaskRender key={tasks.task_id} {...tasks} />;
        })}
      </div>
    </div>
  );
};

export default TaskCategory;
