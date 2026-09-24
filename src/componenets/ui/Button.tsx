import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  disabled,
  className = "",
  fullWidth = true,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        rounded-md
        bg-primary-600
        px-4
        py-2.5
        text-sm
        font-semibold
        text-white
        transition
        duration-fast
        hover:bg-primary-700
        focus:outline-none
        focus:ring-2
        focus:ring-primary-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {children}
    </button>
  );
}