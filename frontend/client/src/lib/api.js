const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5000';

const parseResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || 'Unable to complete request';
    throw new Error(message);
  }
  return response.json();
};

export const TodosAPI = {
  async list() {
    const res = await fetch(`${BASE_URL}/api/todos`);
    return parseResponse(res);
  },

  async create(payload) {
    const body =
      typeof payload === 'string' ? { title: payload } : { ...payload };
    const res = await fetch(`${BASE_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return parseResponse(res);
  },

  async update(id, updates) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return parseResponse(res);
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    return parseResponse(res);
  },
};
