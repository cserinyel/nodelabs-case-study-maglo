import Button from "../../../shared/components/button/button";
import Input from "../../../shared/components/input/input";
import SignActionButton from "../components/signActionButton";

const SignIn = () => {
  return (
    <div className="flex flex-1 flex-col gap-[25px] justify-center w-full max-w-[404px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-title-1">Sign In</h1>
        <p className="text-[16px] font-normal text-3">
          Welcome back! Please enter your details
        </p>
      </div>
      <form className="flex flex-col gap-[25px]">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
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
