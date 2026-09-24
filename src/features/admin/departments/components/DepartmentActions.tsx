import { Pencil, ShieldCheck, Trash } from "lucide-react";

import type { Department } from "../departments.types";

interface DepartmentActionsProps {
  department: Department;
  onEdit: (department: Department) => void;
  onToggleStatus: (department: Department) => void;
}

export default function DepartmentActions({
  department,
  onEdit,
  onToggleStatus,
}: DepartmentActionsProps) {
    
  return (

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onEdit(department)}
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-50"
      >
        <Pencil />
      </button>

      <button
        type="button"
        onClick={() => onToggleStatus(department)}
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-md
          transition

          ${
            department.is_active
              ? "bg-danger-50 text-danger-600 hover:bg-danger-100"
              : "bg-success-50 text-success-600 hover:bg-success-100"
          }
        `}      >
        {department.is_active === 1 ? <Trash /> : <ShieldCheck />}
      </button>
    </div>
  );
}