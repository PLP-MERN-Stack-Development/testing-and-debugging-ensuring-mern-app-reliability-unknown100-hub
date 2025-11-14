import { useCallback, useEffect, useMemo, useState } from 'react';
import { TodosAPI } from '../lib/api';

export function useTodos() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await TodosAPI.list();
        setItems(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTodo = useCallback(async (title, description = '') => {
    try {
      const newTodo = await TodosAPI.create({ title, description });
      setItems((prev) => [...prev, newTodo]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, []);

  const toggleTodo = useCallback(async (todo) => {
    try {
      const updated = await TodosAPI.update(todo._id, {
        completed: !todo.completed,
      });
      setItems((prev) =>
        prev.map((item) => (item._id === todo._id ? updated : item)),
      );
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const deleteTodo = useCallback(async (todo) => {
    try {
      await TodosAPI.remove(todo._id);
      setItems((prev) => prev.filter((item) => item._id !== todo._id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === 'completed') {
      return items.filter((item) => item.completed);
    }
    if (statusFilter === 'open') {
      return items.filter((item) => !item.completed);
    }
    return items;
  }, [items, statusFilter]);

  return {
    todos: filtered,
    total: items.length,
    completed: items.filter((item) => item.completed).length,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
