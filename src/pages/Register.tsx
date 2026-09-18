import { Link } from "react-router-dom";

import Card from "../componenets/ui/Card";
import RegisterForm from "../features/auth/RegisterForm";

export default function Register() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-background
        px-4
        py-8
      "
    >
      <Card className="w-full max-w-md p-8">
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
 
        <div className="mb-8 text-center">
          
          <h1
            className="
              text-2xl
              font-bold
              text-text-primary
            "
          >
            Create Account
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-text-secondary
            "
          >
            Join the Employee Management System
          </p>
        </div>

        <RegisterForm />

        <div
          className="
            mt-6
            border-t
            border-border-light
            pt-5
            text-center
          "
        >
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                font-medium
                text-primary-600
                transition
                duration-fast
                hover:text-primary-700
              "
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}