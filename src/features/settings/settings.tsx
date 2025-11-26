import { useRefreshToken } from "../../api/auth";
import Button from "../../shared/components/button/button";

const Settings = () => {
  const { mutate: refreshToken, isPending } = useRefreshToken();

  const handleRefreshToken = () => {
    refreshToken();
  };

  return (
    <article className="p-6" aria-labelledby="settings-heading">
      <h1 id="settings-heading" className="text-2xl font-bold mb-6">
        Settings
      </h1>

      <section
        className="bg-white rounded-lg p-4 shadow-sm"
        aria-labelledby="token-management-heading"
      >
        <h2 id="token-management-heading" className="text-lg font-medium mb-2">
          Token Management
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Manually refresh your access token if needed.
        </p>
        <Button
          type="button"
          onClick={handleRefreshToken}
          disabled={isPending}
          aria-busy={isPending}
          aria-label="Refresh token"
        >
          {isPending ? "Refreshing..." : "Refresh Token"}
        </Button>
      </section>
    </article>
  );
};

export default Settings;
