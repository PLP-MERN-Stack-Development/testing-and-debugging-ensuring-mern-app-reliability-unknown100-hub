import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function TodoForm({ onSubmit, busy }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    const success = await onSubmit(title.trim(), description.trim());
    if (success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        aria-label="Todo title"
        placeholder="Add todo title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        aria-label="Todo description"
        placeholder="Description (optional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button type="submit" disabled={busy || !title.trim()}>
        Add
      </Button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  busy: PropTypes.bool,
};
