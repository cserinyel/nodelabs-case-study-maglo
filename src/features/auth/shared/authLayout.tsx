import { Outlet } from "react-router";
import magloLogo from "../../../assets/images/maglo-logo.svg";
import authBackground from "../../../assets/images/auth-background.png";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-row">
      <main className="flex flex-col flex-1 items-center justify-center w-full my-[40px] mx-[20px] lg:items-baseline lg:mx-[60px] xl:mx-[135px] ">
        <section className="flex flex-col flex-1 items-center justify-center w-full max-w-[400px]">
          <img
            src={magloLogo}
            alt="Maglo Logo"
            className="min-w-[122px] h-auto fixxed self-start"
          />
          <Outlet />
        </section>
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
