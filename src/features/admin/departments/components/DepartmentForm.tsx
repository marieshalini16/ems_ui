import { useEffect, useState } from "react";

import Input from "../../../../componenets/ui/Input";

import type {
  Department,
  DepartmentFormData,
} from "../departments.types";
import { X } from "lucide-react";

interface DepartmentFormProps {
  mode: "create" | "edit";
  department?: Department;
  loading: boolean;

  onSubmit: (
    data: DepartmentFormData,
  ) => Promise<void>;

  onClose: () => void;
}

export default function DepartmentForm({
  mode,
  department,
  loading,
  onSubmit,
  onClose,
}: DepartmentFormProps) {
  const [formData, setFormData] =
    useState<DepartmentFormData>({
      dept_name: "",
      description: "",
    });

  useEffect(() => {
    if (mode === "edit" && department) {
      setFormData({
        dept_name: department.dept_name,
        description: department.description ?? "",
      });
    } else {
      setFormData({
        dept_name: "",
        description: "",
      });
    }
  }, [mode, department]);

  const handleChange = (
    field: keyof DepartmentFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-background-white p-6 shadow-card">
        
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {mode === "create"
                ? "Add Department"
                : "Edit Department"}
            </h2>

            <p className="mt-1 text-sm text-text-muted">
              {mode === "create"
                ? "Create a new department."
                : "Update department information."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-text-muted hover:text-text-primary"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Department Name"
            value={formData.dept_name}
            onChange={(event) =>
              handleChange(
                "dept_name",
                event.target.value,
              )
            }
            placeholder="Enter department name"
            required
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Description
            </label>

            <textarea
              value={formData.description}
              onChange={(event) =>
                handleChange(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Enter department description"
              rows={4}
              className="w-full rounded-md border border-border bg-background-white px-3 py-2 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-border-light pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-background-muted"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : mode === "create" ? "Add Employee" : "Save Changes"}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}