import { NavLink } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#04022d] text-[#fef6e9] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Creme and Crumbs Logo"
              className="w-12 h-12 rounded-full object-cover"
            />

            <span className="font-serif text-2xl text-[#fe9c00]">
              Crème & Crumbs
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#fef6e9]/70 max-w-sm">
            Freshly baked treats made with love. Bringing sweetness to your
            everyday moments.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>

          <ul className="space-y-3 text-sm">
            <li>
              <NavLink to="/" className="hover:text-[#fe9c00] transition">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="hover:text-[#fe9c00] transition">
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/articles"
                className="hover:text-[#fe9c00] transition"
              >
                Articles
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact & Follow Us</h4>

          <div className="space-y-4 text-sm text-[#fef6e9]/70">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Quezon City, Philippines</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+63 912 345 6789</span>
            </div>

            <div className="flex items-center gap-3 break-all">
              <Mail size={18} />
              <span>cremecrumbs@email.com</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61580188506991"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-[#fe9c00] hover:text-black transition"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://www.instagram.com/cremecrumbs_bakehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-[#fe9c00] hover:text-black transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center text-xs sm:text-sm py-4 px-4 text-[#fef6e9]/60">
        © {new Date().getFullYear()} Crème & Crumbs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
