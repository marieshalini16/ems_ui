import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";

import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">

      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-white p-8 shadow-card">

          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
            <UsersRound />
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
              className=" font-medium text-primary-600 transition duration-fast hover:text-primary-700">
              Register
            </Link>
          </p>
          
        </div>
        
        </div>
      </div>
    </main>
  );
}