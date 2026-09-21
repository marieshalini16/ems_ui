import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../componenets/ui/Button";
import Input from "../../componenets/ui/Input";
import { login } from "./auth.api";

export default function LoginForm() {
    
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,) {

    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      
      const data = await login({
        email,
        password,
      });

      localStorage.setItem( "access_token",data.access_token,);
      localStorage.setItem("userId",String(data.userId),);
      localStorage.setItem("role_id",String(data.role_id),);

      if (data.role_id === 1) {
        navigate("/admin/dashboard");
      } 

      else if (data.role_id === 2) {
        navigate("/employee/dashboard");
      } 

      else {
        setError("Invalid user role.");
      }
    } 
    
    catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to login.",
      );
    } 
    
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      {error && (
        <div className="rounded-md border border-danger-200 bg-danger-50 px-3 py-2.5">
          <p className="text-sm text-danger-600">
            {error}
          </p>
        </div>
      )}

      <Button type="submit" > Login </Button>
    </form>
  );
}