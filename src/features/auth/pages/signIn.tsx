import { useState } from "react";
import { useLogin } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "can@example.com",
    password: "Pa$w0rd123",
  });

  const loginMutation = useLogin({
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful:", data);
      navigate("/dashboard");
    },
    onError: (error) => {
      // Handle error
      console.error("Login failed:", error);
      // You can show a toast notification here
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-title-1">Sign In</h1>
        <p className="text-[16px] font-normal text-3">
          Welcome back! Please enter your details
        </p>
      </div>
      <form className="flex flex-col gap-[25px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <Button>Sign In</Button>
        <Button
          icon="/src/assets/icons/google.svg"
          iconSize="small"
          variant="border"
        >
          Sign In with Google
        </Button>
        <SignActionButton mode="signIn" />
      </form>
    </div>
  );
};

export default SignIn;
