import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../../../componenets/ui/Button";
import type { MyTask, MyTaskStatus, UpdateMyTaskRequest } from "./mytask.types";

interface MyTaskUpdateFormProps {
  task: MyTask;
  statuses: MyTaskStatus[];
  loading?: boolean;
  onSubmit: (data: UpdateMyTaskRequest) => Promise<void>;
  onClose: () => void;
}

export default function MyTaskUpdateForm({
  task,
  statuses,
  loading = false,
  onSubmit,
  onClose,
}: MyTaskUpdateFormProps) {

  const [statusId, setStatusId] = useState<string>("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    setStatusId( String(task.status_id), );
    setComments( task.comments ?? "", );
  }, [task]);

  async function handleSubmit(event: React.FormEvent) {

    event.preventDefault();

    if (!statusId) {
      return;
    }

    await onSubmit({
      status_id: Number(statusId),
      comments: comments.trim() || undefined,
    });
  }

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 " >
      <div className=" max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-background-white p-6 shadow-card " >
        {/* Header */}

        <div className=" mb-6 flex items-center justify-between " >
          <div>
            <h2 className=" text-xl font-semibold text-text-primary " >
               Update Task 
            </h2>

            <p className=" mt-1 text-sm text-text-muted " >
              Update the status of your assigned task
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

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            <div>
              <p className=" py-2.5 text-sm text-text-primary"><b>Title: </b>{task.title}</p>
              <p className=" py-2.5 text-sm text-text-primary"> <b>Assigned To: </b>{task.assigned_employee?.full_name ?? "-"}</p>
              <p className=" py-2.5 text-sm text-text-primary"><b>Current Status: </b>{task.status?.status_name ?? "-"}</p>

            </div>

            {/* Update Status */}

            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Update Status
                <span className="text-danger-600"> {" "}* </span>
              </label>

              <select
                value={statusId}
                onChange={(event) => setStatusId(event.target.value) }
                required
                className=" w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              >
                <option value=""> Select Status </option>

                {statuses.map(
                  (status) => (
                    <option key={status.id} value={status.id} >
                      {status.status_name}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* Comments */}

            <div>
              <label className=" mb-1.5 block text-sm font-medium text-text-primary " >
                Comments

                <span className="ml-1 text-xs font-normal text-text-muted">
                  (Optional)
                </span>
              </label>

              <textarea
                value={comments}
                onChange={(event) => setComments(event.target.value) }
                placeholder="Add comments..."
                rows={4}
                className=" w-full resize-none rounded-md border border-border px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 "
              />
            </div>
          </div>

          {/* Buttons */}

          <div className=" mt-8 flex justify-end gap-3 border-t border-border-light pt-5 " >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className=" rounded-md border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-background-muted disabled:cursor-not-allowed disabled:opacity-60 "
            >
              Cancel
            </button>

            <Button
              type="submit"
              fullWidth={false}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}