import { Outlet } from "react-router";
import magloLogo from "../../../assets/images/maglo-logo.svg";
import authBackground from "../../../assets/images/auth-background.png";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-row">
      <main className="flex flex-col items-baseline justify-center w-full my-[40px] mx-[135px] ">
        <img
          src={magloLogo}
          alt="Maglo Logo"
          className="min-w-[122px] h-auto fixxed"
        />
        <Outlet />
      </main>

      <aside
        className="bg-center shrink-0 hidden lg:block lg:w-[500px] xl:w-[675px]"
        aria-hidden="true"
      >
        <img
          src={authBackground}
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
        />
      </aside>
    </div>
  );
};

export default AuthLayout;
