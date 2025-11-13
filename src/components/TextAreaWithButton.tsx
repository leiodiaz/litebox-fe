import { TextareaHTMLAttributes, useState } from 'react';
import Button from './Button';

interface TextAreaWithButtonProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onSubmit'> {
  buttonText?: string;
  onSubmit?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function TextAreaWithButton({ 
  buttonText = 'Submit',
  onSubmit,
  error = false,
  errorMessage,
  disabled,
  className = '',
  ...props 
}: TextAreaWithButtonProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = () => {
    if (onSubmit && value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  const getBorderColor = () => {
    if (disabled) return 'border-gray-300';
    if (error) return 'border-red-500';
    if (isFocused) return 'border-primary';
    if (value) return 'border-primary';
    return 'border-primary';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex flex-col md:flex-row gap-4 border ${getBorderColor()} rounded-[5px] p-[20px] md:p-6 ${className}`}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="flex-1 min-h-[100px] md:min-h-[60px] resize-none bg-transparent text-black placeholder-gray focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          {...props}
        />
        <Button 
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          variant="primary-green"
          className="self-end"
        >
          {buttonText}
        </Button>
      </div>
      {error && errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
