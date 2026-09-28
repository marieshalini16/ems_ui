import { useEffect, useState, } from "react";
import { X } from "lucide-react";

import type { Task, TaskEmployee, TaskFormData, TaskPriority, TaskStatus, } from "../tasks.types";


interface TaskFormProps {
  mode: "create" | "edit";
  task?: Task;
  employees: TaskEmployee[];
  priorities: TaskPriority[];
  statuses: TaskStatus[];
  loading?: boolean;

  onSubmit: ( data: TaskFormData, ) => Promise<void>;
  onClose: () => void;
}


const defaultForm: TaskFormData = {
  title: "",
  description: "",
  assign_to: "",
  priority_id: "",
  status_id: "",
  due_date: "",
  comments: "",
};


export default function TaskForm({
  mode,
  task,
  employees,
  priorities,
  statuses,
  loading = false,
  onSubmit,
  onClose,
}: TaskFormProps) {

  const [formData, setFormData] = useState<TaskFormData>( defaultForm, );

  useEffect(() => {
    
    if (mode === "edit" && task) {
      setFormData({
        title: task.title ?? "",
        description: task.description ?? "",
        assign_to: task.assign_to ?? "",
        priority_id: task.priority_id ?? "",
        status_id: task.status_id ?? "",
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        comments: task.comments ?? "",
      });

      return;
    }
    setFormData({ ...defaultForm, });

  }, [mode, task]);


  const handleChange = ( event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >, ) => {
   
    const { name, value, } = event.target;
    
    setFormData( (previous) => ({ 
      ...previous,

        [name]:
          name === "assign_to" ||
          name === "priority_id" ||
          name === "status_id" ? value === "" ? "" : Number(value) : value,
      }),
    );
  };


  const handleSubmit = ( event: React.FormEvent, ) => {
    
    event.preventDefault();
    onSubmit(formData);
  };


  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 " >
      <div className=" max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-background-white p-6 shadow-card " >


        <div className=" mb-6 flex items-center justify-between " >
          <div>
            <h2 className=" text-xl font-semibold text-text-primary " >
              {mode === "create" ? "Add Task" : "Edit Task"}
            </h2>

            <p className=" mt-1 text-sm text-text-muted " >
              {mode === "create" ? "Create a new task" : "Update task information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className=" text-text-muted transition hover:text-text-primary "
          >
            <X size={20} />
          </button>
        </div>


        <form onSubmit={handleSubmit}>

          <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 " >

            <div className="md:col-span-2">
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Task Title

                <span className="text-danger-600">
                  {" "}*
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
                className=" w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              />
            </div>

            <div className="md:col-span-2">
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={4}
                className=" w-full resize-none rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              />
            </div>


            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Assign To

                <span className="text-danger-600">
                  {" "}*
                </span>
              </label>

              <select
                name="assign_to"
                value={formData.assign_to}
                onChange={handleChange}
                required
                className=" w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              >
                <option value="">
                  Select Employee
                </option>

                {employees.map(
                  (employee) => (
                    <option key={employee.id} value={employee.id} >
                      {employee.full_name}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Priority

                <span className="text-danger-600">
                  {" "}*
                </span>
              </label>

              <select
                name="priority_id"
                value={formData.priority_id}
                onChange={handleChange}
                required
                className=" w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              >
                <option value=""> Select Priority </option>

                {priorities.map(
                  (priority) => (
                    <option key={priority.id} value={priority.id} >
                      {priority.priority_name}
                    </option>
                  ),
                )}
              </select>
            </div>


            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Status

                <span className="text-danger-600">
                  {" "}*
                </span>
              </label>

              <select
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                required
                className=" w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 " 
                >
                
                <option value="">
                  Select Status
                </option>

                {statuses.map(
                  (status) => (
                    <option key={status.id} value={status.id} >
                      {status.status_name}
                    </option>
                  ),
                )}
              </select>
            </div>


            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Due Date

                <span className="text-danger-600">
                  {" "}*
                </span>
              </label>

              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                required
                className=" w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              />
            </div>


            <div className="md:col-span-2">
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Comments
              </label>

              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Add comments..."
                rows={3}
                className=" w-full resize-none rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              />
            </div>

          </div>


          <div className=" mt-8 flex justify-end gap-3 border-t border-border-light pt-5 " >
            <button
              type="button"
              onClick={onClose}
              className=" rounded-md border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-background-muted "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className=" rounded-md bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 "
            >
              {loading ? "Saving..." : mode === "create" ? "Add Task" : "Save Changes"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}