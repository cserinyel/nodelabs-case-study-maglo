import { useLogin } from "../../../api/auth";
import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";
import type { LoginCredentials } from "../../../types/auth";
import { validateEmail, validatePasswordEntry } from "../utils/helpers";
import Spinner from "../../../shared/components/spinner/spinner";
import GoogleSignIn from "../components/googleSignIn";
import { useAuthForm, createValidator } from "../../../hooks/useAuthForm.tsx";

const signInValidator = createValidator<LoginCredentials>({
  email: validateEmail,
  password: validatePasswordEntry,
});

const SignIn = () => {
  const { mutateAsync: loginMutation, isPending } = useLogin();

  const { formData, validationError, handleInputChange, handleSubmit } =
    useAuthForm({
      initialData: {
        email: "",
        password: "",
      } as LoginCredentials,
      validate: signInValidator,
      onSubmit: loginMutation,
      toastMessages: {
        loadingText: "Signing in...",
        successText: "Signed in successfully!",
        errorText: "Failed to sign in. Please try again.",
      },
    });

  return (
    <section
      className="relative flex flex-1 flex-col gap-[25px] w-full max-w-[404px] justify-center"
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
