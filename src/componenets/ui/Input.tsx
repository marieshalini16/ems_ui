import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) 
{
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
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
          outline-none
          transition
          duration-fast
          placeholder:text-text-muted
          focus:border-primary-500
          focus:ring-2
          focus:ring-primary-100
          ${
            error
              ? "border-danger-500"
              : ""
          }
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}