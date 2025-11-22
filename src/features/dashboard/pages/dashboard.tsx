import Button from "../../../shared/components/button/button";
import { useLogout } from "../../../api/auth";

const Dashboard = () => {
  const { mutate: logoutMutation, isPending } = useLogout();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <div className="p-8">
      <h1 className="text-title-1 mb-4">Dashboard</h1>
      <p className="mb-8">Welcome to your dashboard!</p>

      <div className="w-[200px]">
        <Button variant="primary" onClick={handleLogout} disabled={isPending}>
          {isPending ? "Logging out..." : "Log Out"}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
