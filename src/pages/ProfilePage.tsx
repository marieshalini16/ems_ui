import { useContext, useEffect, useState } from "react";

import Profile from "../features/profile/Profile";
import { getProfile, updateProfile} from "../features/profile/profile.api";
import type { Profile as ProfileData, UpdateProfileRequest} from "../features/profile/profile.types";
import {adminSidebarItems,employeeSidebarItems} from "../componenets/layout/sidebar.config";
import {UserContext} from "../UserContext";

export default function ProfilePage() {
   const userContext = useContext(UserContext);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getRoleIdFromToken(): number | null {
    
    const token = localStorage.getItem("access_token");

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse( atob(token.split(".")[1]));
      return payload.role_id ?? null;
    } 
    
    catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }

  const roleId = getRoleIdFromToken();
 
  const isAdmin = roleId === 1;
  const sidebarItems = isAdmin ? adminSidebarItems : employeeSidebarItems;
  const roleName = isAdmin ? "Administrator" : "Employee";
  const activePath = isAdmin ? "/admin/profile" : "/employee/profile";

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProfile();
        setProfile(data);
      } 
      
      catch (error) {
        console.error("Profile error:", error);
        setError( error instanceof Error ? error.message : "Failed to load profile");
      } 
      
      finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSave( data: UpdateProfileRequest,) {
    
    const response = await updateProfile(data);
    setProfile(response.profile);
    userContext?.setUserName(response.profile.full_name);
  }

  function handleLogout() {
    
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-text-muted">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">

          <p className="text-sm font-medium text-danger-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Try again
          </button>

        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Profile
      profile={profile}
      sidebarItems={sidebarItems}
      activePath={activePath}
      userName={profile.full_name}
      roleName={roleName}
      onSave={handleSave}
      onLogout={handleLogout}
    />
  );
}