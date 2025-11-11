import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-black' | 'primary-green' | 'secondary';
  size?: 'desktop-l' | 'mobile-l';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary-black', 
  size = 'desktop-l',
  children,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-[5px] transition-all duration-200';
  
  const variantStyles = {
    'primary-black': 'bg-black text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-2',
    'primary-green': 'bg-accent text-black hover:bg-[#c4e346] active:bg-[#b0d13e] focus:ring-2 focus:ring-accent focus:ring-offset-2',
    'secondary': 'bg-transparent border-2 border-accent text-black hover:bg-accent/10 active:bg-accent/20 focus:ring-2 focus:ring-accent focus:ring-offset-2'
  };
  
  const sizeStyles = {
    'desktop-l': 'px-[20px] py-[20px] text-base',
    'mobile-l': 'px-[16px] py-[16px] text-sm'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
