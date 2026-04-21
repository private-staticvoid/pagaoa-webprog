import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-1 pt-15">
        {" "}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
