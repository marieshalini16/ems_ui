export interface ProfileDepartment {
  id: number;
  dept_name: string;
}

export interface ProfileRole {
  role_id: number;
  role: string;
}

export interface Profile {
  id: number;
  user_name: string;
  email: string;
  full_name: string;
  phone: string | null;
  doj: string | null;
  designation: string | null;
  department: ProfileDepartment | null;
  role: ProfileRole | null;
  is_active: number | null;
}

export interface UpdateProfileRequest {
  full_name?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  message: string;
  profile: Profile;
}