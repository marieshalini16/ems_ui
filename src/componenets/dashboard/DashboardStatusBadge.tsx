interface StatusBadgeProps {
  label: string;
  variant:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";
}

const styles = {
  success: "bg-success-100 text-success-700",

  warning: "bg-warning-100 text-warning-700",

  danger: "bg-danger-100 text-danger-700",

  info: "bg-info-100 text-info-700",

  neutral: "bg-navy-100 text-navy-700",
};

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {label}
    </span>
  );
}