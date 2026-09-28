import { Pencil, Trash2, } from "lucide-react";

import type { Task } from "../tasks.types";

interface TaskActionsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}


export default function TaskActions({
  task,
  onEdit,
  onDelete,
}: TaskActionsProps) {
  
  return (
    <div className="flex items-center gap-2">

      <button
        type="button"
        onClick={() => onEdit(task)}
        title="Edit task"
        className=" rounded-md px-2.5 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-50 "
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        onClick={() => onDelete(task)}
        title="Delete task"
        className=" flex h-8 w-8 items-center justify-center rounded-md bg-danger-50 text-danger-600 transition hover:bg-danger-100 "
      >
        <Trash2 size={17} />
      </button>

    </div>
  );
}