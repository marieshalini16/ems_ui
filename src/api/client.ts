const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {

  const token = options.token ?? localStorage.getItem("access_token");
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, 
  {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong",
    );
  }

  return result;
}