import Input from "../../../../componenets/ui/Input";

interface DepartmentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DepartmentFilters({
  search,
  onSearchChange,
}: DepartmentFiltersProps) {
    
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          ⌕
        </span>

        <Input
          label=""
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by department name or description..."
          className="pl-9"
        />
      </div>
    </div>
  );
}