import { Link } from "react-router-dom";

import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">

      <div className="w-full max-w-md">

        <div className="rounded-xl border border-border bg-white p-8 shadow-card">

          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">

              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-600"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

            </div>
          </div>

          <div className="mb-7 text-center">

            <h1 className="text-xl font-semibold text-text-primary">
              Employee Management System
            </h1>

            <p className="mt-1.5 text-sm text-text-secondary">
              Sign in to your account
            </p>

          </div>

          <LoginForm />

          <div
          className=" mt-6 border-t border-border-light pt-5 text-center">
                  
          <p className="text-sm text-text-secondary">
            Don't have an account?{" "}

            <Link
              to="/register"
              className=" 
                font-medium
                text-primary-600
                transition
                duration-fast
                hover:text-primary-700
              "
            >
              Register
            </Link>
          </p>
        </div>

        </div>

      </div>

    </main>
  );
}