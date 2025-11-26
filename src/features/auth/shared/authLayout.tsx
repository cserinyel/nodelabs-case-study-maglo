import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-row">
      <main className="flex flex-col items-center flex-1 my-[40px] mx-[40px] lg:items-baseline lg:mr-[100px] lg:ml-[135px] xl:mx-[135px]">
        <img
          src="/src/assets/images/maglo-logo.svg"
          alt="Maglo Logo"
          className="min-w-[122px] h-auto"
        />
        <Outlet />
      </main>

      <aside
        className="bg-center shrink-0 hidden lg:block lg:w-[500px] xl:w-[675px]"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/auth-background.png"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
        />
      </aside>
    </div>
  );
};

export default AuthLayout;
