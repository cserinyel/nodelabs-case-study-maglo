import { GoogleIcon } from "../../../assets/icons/icons";
import Button from "../../../shared/components/button/button";

const GoogleSignIn = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      icon={GoogleIcon}
      iconSize="small"
      variant="border"
      type="button"
      disabled={isPending}
      aria-label="Sign in with Google"
    >
      Sign In with Google
    </Button>
  );
};

export default GoogleSignIn;
