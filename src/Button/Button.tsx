import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    children,
    className = '',
    ...rest
  } = props;

  const classes = [
    'ti-btn',
    'btn-wave',
    'waves-effect',
    'waves-light',
    variant === 'primary' ? 'ti-btn-ghost-primary' : 'ti-btn-ghost-secondary',
    className
  ].join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
};
