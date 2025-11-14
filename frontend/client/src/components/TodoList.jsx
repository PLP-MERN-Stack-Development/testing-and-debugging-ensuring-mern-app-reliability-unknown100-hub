import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoItem.propTypes.todo).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
