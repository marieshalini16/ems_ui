import Input from "../../../../componenets/ui/Input";
import Select from "../../../../componenets/ui/Select";

import type { Department } from "../employees.types";


interface EmployeeFiltersProps {
  search: string;
  departmentId: string;
  status: string;
  departments: Department[];

  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function EmployeeFilters({
  search,
  departmentId,
  departments,
  onSearchChange,
  onDepartmentChange,
}: EmployeeFiltersProps) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
      {/* Search */}

      <div className="relative">
        <span
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-text-muted
          "
        >
          ⌕
        </span>

        <Input
          label=""
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by name or email..."
          className="pl-9"
        />
      </div>

      {/* Department */}
      <div className="pt-1.5">
        <Select
          value={departmentId}
          onChange={(event) =>
            onDepartmentChange(event.target.value)
          }
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.dept_name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}