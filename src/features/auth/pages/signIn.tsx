import { useState } from "react";
import { useLogin } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import type { LoginCredentials } from "../../../types/auth";
import { validateEmail, validatePasswordEntry } from "../utils/helpers";

const SignIn = () => {
  const { mutate: loginMutation, isPending } = useLogin();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "can@example.com",
    password: "Pa$w0rd123",
  });
  const [validationError, setValidationError] =
    useState<Record<string, string | string[] | undefined>>();

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
            email: emailResult.error,
            password: passwordResult.error,
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
    loginMutation(formData);
  };

  return (
    <div className="flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]">
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
          />
          {validationError?.email && (
            <p className="text-error-1 text-[14px] font-normal">
              {validationError.email}
            </p>
          )}
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
            disabled={isPending}
          />
          {validationError?.password && (
            <p className="text-error-1 text-[14px] font-normal">
              {validationError.password}
            </p>
          )}
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
