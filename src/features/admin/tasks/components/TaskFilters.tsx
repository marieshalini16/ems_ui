import Input from "../../../../componenets/ui/Input";
import Select from "../../../../componenets/ui/Select";
import type { TaskStatus, } from "../tasks.types";

interface TaskFiltersProps {
  search: string;
  statusId: string;
  statuses: TaskStatus[];

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function TaskFilters({
  search,
  statusId,
  statuses,
  onSearchChange,
  onStatusChange,
}: TaskFiltersProps) {
 
  return (
   <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="relative">
          <span className=" pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted " >
            ⌕
          </span>
            <Input
              label=""
              placeholder="Search by task, employee or priority..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value) }
              className="pl-9"
            />
        </div>
  
  
        <div className="pt-1.5">
          <Select
            value={statusId}
            onChange={(event) => onStatusChange(event.target.value) }
          >
            
            <option value=""> All Statuses </option>

            {statuses.map((status) => (
              <option
                key={status.id}
                value={status.id}
              >
                {status.status_name}
              </option>
            ))}
          </Select>
        </div>
      </div>
);
}