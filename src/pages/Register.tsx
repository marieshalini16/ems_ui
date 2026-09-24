import { Link } from "react-router-dom";

import Card from "../componenets/ui/Card";
import RegisterForm from "../features/auth/RegisterForm";
import { UsersRound } from "lucide-react";

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
              <UsersRound />
            </div>
        </div>
 
        <div className="mb-8 text-center">
          
          <h1 className="text-2xl font-bold text-text-primary">
            Create Account
          </h1>

          <p
            className="mt-1 text-sm text-text-secondary">
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