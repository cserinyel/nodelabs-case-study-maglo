import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-row">
      {/* Left side - Outlet content */}
      <div className="flex flex-col items-baseline flex-1 my-[40px] mx-[135px]">
        <img
          src="/src/assets/images/maglo-logo.svg"
          alt="Maglo Logo"
          className="min-w-[122px] h-auto"
        />
        <Outlet />
      </div>

      {/* Right side - Fixed width with background image */}
      <div className="w-[650px] h-full bg-cover bg-center shrink-0">
        <img
          src="/src/assets/images/auth-background.png"
          alt="Auth Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
