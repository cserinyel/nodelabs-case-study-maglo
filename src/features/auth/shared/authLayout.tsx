import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-row">
      <div className="flex flex-col items-center flex-1 my-[40px] mx-[40px] lg:items-baseline lg:mr-[100px] lg:ml-[135px] xl:mx-[135px]">
        <img
          src="/src/assets/images/maglo-logo.svg"
          alt="Maglo Logo"
          className="min-w-[122px] h-auto"
        />
        <Outlet />
      </div>

      <div className="bg-center shrink-0 hidden lg:block lg:w-[500px] xl:w-[675px]">
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
