import { useState } from "react";
import { useLogin } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import type { LoginCredentials } from "../../../types/auth";
import { validateEmail, validatePasswordEntry } from "../utils/helpers";
import toast from "react-hot-toast";
import Spinner from "../../../shared/components/spinner/spinner";
import GoogleSignIn from "../components/googleSignIn";

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
      toast.error("Please fill in all fields correctly");
      return;
    }
    toast.promise(loginMutation(formData), {
      loading: "Signing in...",
      success: "Signed in successfully!",
      error: (err) => (
        <b>
          {err?.response?.data?.message ||
            err?.message ||
            "Failed to sign in. Please try again."}
        </b>
      ),
    });
  };

  return (
    <section
      className="relative flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]"
      aria-labelledby="signin-heading"
    >
      {isPending && <Spinner mode="coverContent" />}
      <header className="flex flex-col gap-2">
        <h1 id="signin-heading" className="text-title-1">
          Sign In
        </h1>
        <p className="text-[16px] font-normal text-3">
          Welcome back! Please enter your details
        </p>
      </header>
      <form
        className="flex flex-col gap-[25px]"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Sign in form"
      >
        <fieldset className="flex flex-col gap-2 border-none p-0 m-0">
          <legend className="sr-only">Sign in credentials</legend>
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
        <Button type="submit" disabled={isPending} aria-label="Sign in">
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
        <GoogleSignIn isPending={isPending} />
        <SignActionButton mode="signIn" />
      </form>
    </section>
  );
};

export default SignIn;
