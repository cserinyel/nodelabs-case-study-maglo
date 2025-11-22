import { useState } from "react";
import { useRegister } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import type { RegisterCredentials } from "../../../types/auth";
import {
  validateEmail,
  validateName,
  validatePasswordCreation,
} from "../utils/helpers";
import toast from "react-hot-toast";
import Spinner from "../../../shared/components/spinner/spinner";

const SignUp = () => {
  const { mutateAsync: registerMutation, isPending } = useRegister();
  const [formData, setFormData] = useState<RegisterCredentials>({
    fullName: "",
    email: "",
    password: "Pa$w0rd123",
  });
  const [validationError, setValidationError] =
    useState<Record<string, string[] | undefined>>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidation = (data: RegisterCredentials): boolean => {
    const nameResult = validateName(data.fullName);
    const emailResult = validateEmail(data.email);
    const passwordResult = validatePasswordCreation(data.password);

    const isValid =
      nameResult.isValid && emailResult.isValid && passwordResult.isValid;

    setValidationError(
      isValid
        ? undefined
        : {
            fullName: nameResult.errors,
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

    toast.promise(registerMutation(formData), {
      loading: "Creating account...",
      success: <b>Account created successfully! Redirecting to sign in...</b>,
      error: (err) => (
        <b>{err?.message || "Account creation failed. Please try again."}</b>
      ),
    });
  };

  return (
    <div className="relative flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]">
      {isPending && <Spinner mode="coverContent" />}
      <div className="flex flex-col gap-2">
        <h1 className="text-title-1">Create new account</h1>
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
            type="text"
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange(e)}
            disabled={isPending}
            error={validationError?.fullName}
          />
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
          {isPending ? "Creating account..." : "Create Account"}
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
        <SignActionButton mode="signUp" />
      </form>
    </div>
  );
};

export default SignUp;
