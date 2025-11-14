import PropTypes from 'prop-types';
import clsx from '../utils/clsx';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
};

const SIZES = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  const baseClasses = [
    'btn',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    disabled ? 'btn-disabled' : '',
    className,
  ];

  return (
    <button
      type={type}
      className={clsx(baseClasses)}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
