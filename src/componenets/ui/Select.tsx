import type { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export default function Select({
  label,
  children,
  className = "",
  required,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}

          {required && (
            <span className="ml-1 text-danger-600">
              *
            </span>
          )}
        </label>
      )}

      <select
        {...props}
        required={required}
        className={`
          w-full
          rounded-md
          border
          border-border
          bg-white
          px-3
          py-2.5
          text-sm
          text-text-primary
          shadow-input
          outline-none
          transition
          duration-fast
          focus:border-primary-500
          focus:ring-2
          focus:ring-primary-100

          ${className}
        `}
      >
        {children}
      </select>
    </div>
  );
}