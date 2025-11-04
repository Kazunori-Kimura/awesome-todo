import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const checkboxClasses = `h-4 w-4 rounded border-zinc-300 text-foreground focus:ring-2 focus:ring-foreground focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 ${className || ''}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className={checkboxClasses}
          ref={ref}
          {...props}
        />
        {label && (
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';