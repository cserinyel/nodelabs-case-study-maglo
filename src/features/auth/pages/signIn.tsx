import { useState } from "react";
import { useLogin } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import type { LoginCredentials } from "../../../types/auth";
import { validateEmail, validatePasswordEntry } from "../utils/helpers";
import toast from "react-hot-toast";
import Spinner from "../../../shared/components/spinner/spinner";

const SignIn = () => {
  const { mutateAsync: loginMutation, isPending } = useLogin();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "can@example.com",
    password: "Pa$w0rd123",
  });
  const [validationError, setValidationError] =
    useState<Record<string, string[] | undefined>>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidation = (data: LoginCredentials): boolean => {
    const emailResult = validateEmail(data.email);
    const passwordResult = validatePasswordEntry(data.password);

    const isValid = emailResult.isValid && passwordResult.isValid;

    setValidationError(
      isValid
        ? undefined
        : {
            email: emailResult.errors,
            password: passwordResult.errors,
          }
    );

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = handleValidation(formData);
    if (!isValid) {
      return;
    }
    toast.promise(loginMutation(formData), {
      loading: "Signing in...",
      success: "Signed in successfully!",
      error: (err) => (
        <b>{err?.message || "Failed to sign in. Please try again."}</b>
      ),
    });
  };

  return (
    <div className="relative flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]">
      {isPending && <Spinner mode="coverContent" />}
      <div className="flex flex-col gap-2">
        <h1 className="text-title-1">Sign In</h1>
        <p className="text-[16px] font-normal text-3">
          Welcome back! Please enter your details
        </p>
      </div>
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
            disabled={isPending}
            error={validationError?.email}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
            disabled={isPending}
            error={validationError?.password}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
        <Button
          icon="/src/assets/icons/google.svg"
          iconSize="small"
          variant="border"
          type="button"
          disabled={isPending}
        >
          Sign In with Google
        </Button>
        <SignActionButton mode="signIn" />
      </form>
    </div>
  );
};

export default SignIn;
