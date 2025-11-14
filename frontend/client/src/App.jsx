import Button from './components/Button';
import EmptyState from './components/EmptyState';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'completed', label: 'Completed' },
];

export default function App() {
  const {
    todos,
    total,
    completed,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="app-shell">
      <header>
        <p style={{ color: '#6366f1', fontWeight: 600, marginBottom: '0.15rem' }}>
          Sprint Helper
        </p>
        <h1 style={{ margin: '0 0 0.5rem' }}>Team Todo Dashboard</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Track and validate backend tasks while experimenting with automated
          tests.
        </p>
      </header>

      <section className="card" style={{ marginTop: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>
              {completed}/{total}
            </p>
            <span style={{ color: '#6b7280' }}>completed tasks</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {FILTERS.map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={statusFilter === filter.id ? 'primary' : 'secondary'}
                aria-pressed={statusFilter === filter.id}
                onClick={() => setStatusFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <TodoForm onSubmit={addTodo} busy={loading} />

        {error && (
          <p style={{ color: '#dc2626', marginTop: '0.75rem' }} role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p style={{ marginTop: '1.5rem' }}>Loading todos…</p>
        ) : todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        ) : (
          <div style={{ marginTop: '1rem' }}>
            <EmptyState
              title="Nothing to do yet"
              description="Add a task to begin tracking progress."
              actionSlot={
                <Button onClick={() => setStatusFilter('all')}>
                  Reset filters
                </Button>
              }
            />
          </div>
        )}
      </section>
    </div>
  );
}
