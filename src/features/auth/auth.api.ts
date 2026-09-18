const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  userId: number;
  role_id: number;
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    phone: string | null;
    role_id: number;
  };
}


export async function login( credentials: LoginRequest,): Promise<LoginResponse> {

  const response = await fetch(`${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed",
    );
  }

  return data;
}


export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed",);
  }

  return result;
}