import PropTypes from 'prop-types';

export default function EmptyState({ title, description, actionSlot }) {
  return (
    <div
      style={{
        border: '1px dashed #d1d5db',
        borderRadius: '0.75rem',
        padding: '2rem',
        textAlign: 'center',
        color: '#6b7280',
      }}
    >
      <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{title}</p>
      <p style={{ fontSize: '0.95rem' }}>{description}</p>
      {actionSlot && <div style={{ marginTop: '1rem' }}>{actionSlot}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionSlot: PropTypes.node,
};
