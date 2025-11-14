import PropTypes from 'prop-types';
import Button from './Button';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div>
        <p className="todo-title">{todo.title}</p>
        {todo.description && (
          <p className="todo-meta" aria-label="todo-description">
            {todo.description}
          </p>
        )}
        <span
          className={`status-pill ${
            todo.completed ? 'completed' : 'open'
          }`}
        >
          {todo.completed ? 'Completed' : 'Open'}
        </span>
      </div>

      <div className="actions" style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          size="sm"
          variant="secondary"
          aria-label={`toggle-${todo.title}`}
          onClick={() => onToggle(todo)}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button
          size="sm"
          variant="danger"
          aria-label={`delete-${todo.title}`}
          onClick={() => onDelete(todo)}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
