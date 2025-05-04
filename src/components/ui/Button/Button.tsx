import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'transparent' | 'text-dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-primary hover:bg-secondary text-white border border-primary hover:border-secondary',
    outline: 'bg-transparent text-primary hover:bg-primary hover:text-white border border-primary',
    transparent: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent',
    "text-dark": 'bg-transparent text-secondary hover:text-primary border border-transparent',
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1 h-8',
    md: 'text-base px-4 py-2 h-10',
    lg: 'text-lg px-6 py-2 h-12',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-200 focus:outline-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${props.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;