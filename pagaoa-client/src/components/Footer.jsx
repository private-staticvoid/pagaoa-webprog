import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#04022d] text-[#fef6e9] border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Creme and Crumbs Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-serif text-xl">Crème & Crumbs</span>
          </div>
          <p className="mt-4 text-sm text-[#fef6e9]/70">
            Freshly baked treats made with love. Bringing sweetness to your
            everyday moments.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className="hover:underline">
                Articles
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h4 className="font-semibold mb-3">Contact & Follow Us</h4>
          <p className="text-sm text-[#fef6e9]/70">
            📍 Quezon City, Philippines
          </p>
          <p className="text-sm text-[#fef6e9]/70 mt-2">📞 +63 912 345 6789</p>
          <p className="text-sm text-[#fef6e9]/70 mt-2">
            ✉️ cremecrumbs@email.com
          </p>

          <div className="flex gap-4 mt-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61580188506991"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                alt="Facebook"
                className="w-9 h-8"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/cremecrumbs_bakehouse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/042/127/166/small/instagram-logo-on-square-style-with-transparent-background-free-png.png"
                alt="Instagram"
                className="w-7 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#fef6e9]/20 text-center text-xs py-4">
        © {new Date().getFullYear()} Crème & Crumbs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
