import { useState } from "react";

import DashboardLayout from "../../componenets/layout/DashboardLayout";
import type { SidebarItem } from "../../componenets/layout/Sidebar";
import Button from "../../componenets/ui/Button";
import type { Profile as ProfileData, UpdateProfileRequest} from "./profile.types";

interface ProfileProps {
  profile: ProfileData;
  sidebarItems: SidebarItem[];
  activePath: string;
  userName: string;
  roleName: string;
  onSave: (data: UpdateProfileRequest) => Promise<void>;
  onLogout?: () => void;
}

export default function Profile({
  profile,
  sidebarItems,
  activePath,
  userName,
  roleName,
  onSave,
  onLogout,
}: ProfileProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.full_name);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  function handleEdit() {
    setFullName(profile.full_name);
    setPhone(profile.phone ?? "");
    setSaveError(null);
    setIsEditing(true);
  }

  function handleCancel() {
    setFullName(profile.full_name);
    setPhone(profile.phone ?? "");
    setSaveError(null);
    setIsEditing(false);
  }

  async function handleSave() {
    try {
      setSaving(true);
      setSaveError(null);

      await onSave({
        full_name: fullName,
        phone: phone || undefined,
      });

      setIsEditing(false);
    } 
    
    catch (error) {
      setSaveError(error instanceof Error? error.message : "Failed to update profile");
    } 
    
    finally {
      setSaving(false);
    }
  }

  const initials = profile.full_name
    .split(" ")
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statusText = profile.is_active === 1 ? "Active" : "Inactive";

  const formattedDate = profile.doj
    ? new Date(profile.doj).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activePath={activePath}
      userName={userName}
      roleName={roleName}
      onLogout={onLogout}
    >
      <div className="min-h-[calc(100vh-4rem)] bg-background p-5 lg:p-7">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">
              My Profile
            </h1>
          </div>

          {!isEditing && (
            <Button
              type="button"
              fullWidth={false}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )}

           {isEditing && (
                <div className="flex gap-2">

                  <Button
                    type="button"
                    fullWidth={false}
                    disabled={saving}
                    onClick={handleCancel}
                    className="bg-gray-100 text-text-primary hover:bg-gray-200"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    fullWidth={false}
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>

                </div>
              )}
        </div>

        {saveError && (
          <div className="mb-5 rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700">
            {saveError}
          </div>
        )}


        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[320px_1fr]">

          {/* Left Card */}
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-border bg-surface p-6">

        <div className="flex flex-col items-center text-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-100 text-3xl font-semibold text-primary-700">
            {initials}
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-text-primary">
            {profile.full_name}
            </h2>

            <p className="mt-2 text-base font-medium text-text-secondary">
            {profile.designation || "No designation"}
            </p>

            <p className="mt-2 text-sm text-text-muted">
            {profile.department?.dept_name || "No department"}
            </p>

        </div>
        </div>

          {/* Right Card */}
          <div className="rounded-xl border border-border bg-surface p-6">

            <div className="grid grid-cols-1 gap-y-5">
            
              <div>
                <label className="text-xs font-medium text-text-muted">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                ) : (
                  <p className="mt-1.5 text-sm font-medium text-text-primary">
                    {profile.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Email
                </label>

                <p className="mt-1.5 text-sm font-medium text-text-primary">
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Phone
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                ) : (
                  <p className="mt-1.5 text-sm font-medium text-text-primary">
                    {profile.phone || "Not available"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Department
                </label>

                <p className="mt-1.5 text-sm font-medium text-text-primary">
                  {profile.department?.dept_name ||
                    "Not available"}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Designation
                </label>

                <p className="mt-1.5 text-sm font-medium text-text-primary">
                  {profile.designation || "Not available"}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Joining Date
                </label>

                <p className="mt-1.5 text-sm font-medium text-text-primary">
                  {formattedDate}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">
                  Status
                </label>

                <p
                  className={`mt-1.5 text-sm font-medium ${
                    profile.is_active === 1
                      ? "text-success-600"
                      : "text-danger-600"
                  }`}
                >
                  {statusText}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}