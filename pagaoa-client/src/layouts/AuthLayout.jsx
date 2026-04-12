import { Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";

const AuthLayout = () => {
  return (
    <section className="min-h-screen flex bg-[#f3ede6]">
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#070546] p-12">
        <div className="text-center text-[#f3ede6] max-w-md">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Crème & Crumbs Logo"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#f3ede6]"
            />
          </div>

          <h1 className="text-4xl font-serif font-bold">Crème & Crumbs</h1>

          <p className="mt-4 text-sm leading-6 text-[#f3ede6]/80">
            Freshly baked joy, crafted with love. Every bite feels like home.
          </p>

          <div className="mt-10 rounded-3xl overflow-hidden border border-[#f3ede6]/20">
            <img
              src="https://i.pinimg.com/736x/23/93/e8/2393e858d05c9bf4687a3fdfa710e454.jpg"
              alt="Bakery"
              className="w-[460px] h-[340px] object-cover opacity-90"
            />
          </div>

          <p className="mt-6 text-xs tracking-[0.3em] uppercase opacity-70">
            Handmade • Fresh • Delicious
          </p>
        </div>
      </div>

      <main className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;
