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
import GoogleSignIn from "../components/googleSignIn";

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
      toast.error("Please fill in all fields correctly");
      return;
    }

    toast.promise(registerMutation(formData), {
      loading: "Creating account...",
      success: <b>Account created successfully! Redirecting to sign in...</b>,
      error: (err) => (
        <b>
          {err?.response?.data?.message ||
            err?.message ||
            "Account creation failed. Please try again."}
        </b>
      ),
    });
  };

  return (
    <section
      className="relative flex flex-1 flex-col gap-[25px] w-full max-w-[404px] justify-center lg:mt-[158px] lg:justify-start"
      aria-labelledby="signup-heading"
    >
      {isPending && <Spinner mode="coverContent" />}
      <header className="flex flex-col gap-2">
        <h1 id="signup-heading" className="text-title-1">
          Create new account
        </h1>
        <p className="text-[16px] font-normal text-3">
          Welcome! Please enter your details to get started
        </p>
      </header>
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Sign up form"
      >
        <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
          <legend className="sr-only">Account registration details</legend>
          <Input
            type="text"
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange(e)}
            disabled={isPending}
            error={validationError?.fullName}
            aria-label="Full Name"
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
            aria-label="Email"
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
            aria-label="Password"
          />
        </fieldset>
        <Button type="submit" disabled={isPending} aria-label="Create account">
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
        <GoogleSignIn isPending={isPending} />
        <SignActionButton mode="signUp" />
      </form>
    </section>
  );
};

export default SignUp;
