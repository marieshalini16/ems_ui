import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../componenets/ui/Button";
import Input from "../../componenets/ui/Input";
import { register } from "./auth.api";


export default function RegisterForm() {

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {

    event.preventDefault();
    setError("");
    setSuccess("");

    if (!fullname.trim() || !email.trim() || !phone.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    try {

      await register({
        fullname: fullname.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      setSuccess("Registration successful. Redirecting to login...");

      setFullname("");
      setEmail("");
      setPhone("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } 
    
    catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to register",
      );
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={fullname}
        onChange={(event) => setFullname(event.target.value)}
        autoComplete="name"
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(event) =>setPhone(event.target.value)}
        autoComplete="tel"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="new-password"
      />

      {error && (
        <div
          className="
            rounded-md
            border
            border-danger-200
            bg-danger-50
            px-3
            py-2.5
            text-sm
            text-danger-700
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            rounded-md
            border
            border-success-200
            bg-success-50
            px-3
            py-2.5
            text-sm
            text-success-700
          "
        >
          {success}
        </div>
      )}

      <Button type="submit"> Create Account </Button>
    </form>
  );
}