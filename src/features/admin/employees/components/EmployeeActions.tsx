import type { Employee } from "../employees.types";

interface EmployeeActionsProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onToggleStatus: (employee: Employee) => void;
}

export default function EmployeeActions({
  employee,
  onEdit,
  onToggleStatus,
}: EmployeeActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Edit */}

      <button
        type="button"
        onClick={() => onEdit(employee)}
        title="Edit employee"
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          bg-primary-50
          text-primary-600
          transition
          hover:bg-primary-100
        "
      >
        ✎
      </button>

      {/* Activate / Deactivate */}

      <button
        type="button"
        onClick={() =>
          onToggleStatus(employee)
        }
        title={
          employee.is_active
            ? "Deactivate employee"
            : "Activate employee"
        }
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          transition

          ${
            employee.is_active
              ? "bg-danger-50 text-danger-600 hover:bg-danger-100"
              : "bg-success-50 text-success-600 hover:bg-success-100"
          }
        `}
      >
        {employee.is_active ? "X" : "✓"}
      </button>
    </div>
  );
}