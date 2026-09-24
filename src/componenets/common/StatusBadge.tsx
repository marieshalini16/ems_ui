interface StatusBadgeProps {
  active: boolean;
}

export default function StatusBadge({
  active,
}: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${
          active
            ? "bg-success-50 text-success-700"
            : "bg-danger-50 text-danger-700"
        }
      `}
    >
      <span
        className={`
          mr-1.5
          h-1.5
          w-1.5
          rounded-full
          ${
            active
              ? "bg-success-500"
              : "bg-danger-500"
          }
        `}
      />

      {active ? "Active" : "Inactive"}
    </span>
  );
}