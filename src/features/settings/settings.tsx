import { useRefreshToken } from "../../api/auth";

const Settings = () => {
  const { mutate: refreshToken, isPending } = useRefreshToken();

  const handleRefreshToken = () => {
    refreshToken();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-medium mb-2">Token Management</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Manually refresh your access token if needed.
        </p>
        <button
          onClick={handleRefreshToken}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Refreshing..." : "Refresh Token"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
