import { apiClient } from "../../api/client";

import type { Profile, UpdateProfileRequest, UpdateProfileResponse } from "./profile.types";

export async function getProfile(): Promise<Profile> {
 
  return apiClient<Profile>("/profile", {
    method: "GET",
  });
}

export async function updateProfile( data: UpdateProfileRequest ): Promise<UpdateProfileResponse> {
  
  return apiClient<UpdateProfileResponse>("/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}