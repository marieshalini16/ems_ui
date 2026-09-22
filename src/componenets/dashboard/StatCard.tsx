interface StatCardProps {
  title: string;
  value: number | string;
  variant:
    | "primary"
    | "success"
    | "warning"
    | "purple";
}

const variantStyles = {
  primary: {
    background: "bg-primary-50",
    border: "border-primary-100",
    valueText: "text-text-primary",
    titleText: "text-primary-700",
  },

  success: {
    background: "bg-success-50",
    border: "border-success-200",
    valueText: "text-text-primary",
    titleText: "text-success-700",
  },

  warning: {
    background: "bg-warning-50",
    border: "border-warning-100",
    valueText: "text-text-primary",
    titleText: "text-warning-700",
  },

  purple: {
    background: "bg-purple-50",
    border: "border-purple-100",
    valueText: "text-text-primary",
    titleText: "text-purple-700",
  },
};

export default function StatCard({
  title,
  value,
  variant,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        w-full
        rounded-xl
        border
        ${styles.border}
        ${styles.background}
        p-5
      `}
    >
      <p className={`text-sm font-medium  ${styles.titleText}`}>
        {title}
      </p>

      <p className={`mt-2 text-2xl font-bold ${styles.valueText}`}>
        {value}
      </p>
    </div>
  );
}
