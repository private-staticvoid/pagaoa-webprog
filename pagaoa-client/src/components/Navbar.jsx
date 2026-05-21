import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-4 py-2 rounded-full text-sm font-semibold transition",
    isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200",
  ].join(" ");

const mobileNavLinkClassName = ({ isActive }) =>
  [
    "block w-full px-4 py-3 rounded-xl text-sm font-semibold transition",
    isActive ? "bg-[#fe9c00] text-black" : "text-white hover:bg-white/10",
  ].join(" ");

const loginClassName = ({ isActive }) =>
  [
    "px-4 py-2 rounded-full text-sm font-semibold transition",
    isActive
      ? "bg-white text-black"
      : "text-[#fef6e9] border border-[#fef6e9] hover:bg-[#fef6e9] hover:text-black",
  ].join(" ");

const TopBar = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full bg-[#fef6e9] text-[#070546] text-sm py-2 text-center font-medium z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      🎉 15% Off on Orders Over $100! | Subscribe & Save 15%
    </div>
  );
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar />

      <header className="fixed top-0 w-full bg-[#04022d] shadow-md z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Creme and Crumbs Logo"
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-serif text-xl text-[#fe9c00]">
              Crème & Crumbs
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}

            <NavLink to="/auth/signin" className={loginClassName}>
              Login
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 py-4" : "max-h-0"
          } bg-[#04022d] px-6`}
        >
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileNavLinkClassName}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/auth/signin"
              className="text-center px-4 py-3 rounded-xl text-sm font-semibold border border-[#fef6e9] text-[#fef6e9] hover:bg-[#fef6e9] hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
