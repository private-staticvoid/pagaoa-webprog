import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      document.title = "Crème & Crumbs";
    } else if (pathname.includes("about")) {
      document.title = "About | Crème & Crumbs";
    } else if (pathname.includes("articles")) {
      document.title = "Articles | Crème & Crumbs";
    } else {
      document.title = "Crème & Crumbs";
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-1 pt-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
