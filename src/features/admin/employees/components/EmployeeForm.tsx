import { useEffect, useState } from "react";
import type { Department, Employee, EmployeeFormData } from "../employees.types";
import { X } from "lucide-react";



interface EmployeeFormProps {
  mode: "create" | "edit";
  employee?: Employee;
  departments: Department[];
  loading?: boolean;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onClose: () => void;
}

const defaultForm: EmployeeFormData = {
  full_name: "",
  user_name: "",
  email: "",
  phone: "",
  password: "",
  dept_id: "",
  designation: "",
  doj: "",
};

export default function EmployeeForm({
  mode,
  employee,
  departments,
  onSubmit,
  onClose,
  loading = false,
}: EmployeeFormProps) {

  const [formData, setFormData] = useState<EmployeeFormData>(defaultForm);

  useEffect(() => {
  if (mode === "edit" && employee) {
    setFormData({
      full_name: employee.full_name ?? "",
      user_name: employee.user_name ?? "",
      email: employee.email ?? "",
      phone: employee.phone ?? "",
      password: "",
      dept_id: employee.dept_id ?? "",
      designation: employee.designation ?? "",
      doj: employee.doj
        ? employee.doj.split("T")[0]
        : "",
    });

    return;
  }

  setFormData(defaultForm);
}, [mode, employee]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "dept_id" ? value === "" ? "" : Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (


  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
  <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-background-white p-6 shadow-card">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            {mode === "create" ? "Add Employee" : "Edit Employee"}
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            {mode === "create"
              ? "Create a new employee"
              : "Update employee information"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-2xl text-danger-700 text-text-muted transition hover:text-text-primary "
        >
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Full Name <span className="text-danger-600">*</span>
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Username <span className="text-danger-600">*</span>
            </label>

            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Email <span className="text-danger-600">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Phone <span className="text-danger-600">*</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Password{" "}
              {mode === "create" && (
                <span className="text-danger-600">*</span>
              )}
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                mode === "create"
                  ? "Enter password"
                  : "Leave blank to keep current password"
              }
              required={mode === "create"}
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Department <span className="text-danger-600">*</span>
            </label>

            <select
              name="dept_id"
              value={formData.dept_id}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.dept_name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Designation <span className="text-danger-600">*</span>
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Date of Joining */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Date of Joining <span className="text-danger-600">*</span>
            </label>

            <input
              type="date"
              name="doj"
              value={formData.doj}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        {/* Buttons */}
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