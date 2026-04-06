import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      {/* Navbar */}
      <NavBar />

      {/* Main content */}
      <main className="flex-1 pt-15">
        {" "}
        {/* flex-1 fills remaining space */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
