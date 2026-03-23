import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* HERO */}
      <section className="border-y-2 s bg-[#f3ede6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image Card */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://www.biggerbolderbaking.com/wp-content/uploads/2021/03/Crazy-cookie-dough-thumbnail-scaled.jpg"
              alt="Crème & Crumbs Bakehouse"
              className="w-full h-72 object-cover"
            />
          </div>
          {/* Text */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#070546]">
              About Crème & Crumbs
            </p>

            <h1 className="max-w-xl text-3xl font-bold font-serif leading-tight text-[#070546] sm:text-4xl">
              Crème & Crumbs Bakehouse
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#070546] sm:text-base">
              Taste the warmth of home in every Crème & Crumble. We bake fresh
              cookies, cakes, and pastries daily using high-quality ingredients
              with love and care.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="border-y-2 border-zinc-900 bg-[#070546] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fef6e9]">
            Contact Info
          </p>
          <h2 className="mt-2 text-2xl font-semibold  text-[#fef6e9]">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Location */}
          <div className="rounded-3xl border-2 border-black bg-[#8cb4be] p-5 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#fef6e9]">📍</p>
            <p className="mt-2 text-sm font-bold text-[#fef6e9] text-center">
              Parang, Marikina City
            </p>
          </div>

          {/* Phone */}
          <div className="rounded-3xl border-2 border-black bg-[#687d9f] p-5 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#fef6e9]">📞</p>
            <p className="mt-2 text-sm font-bold text-[#fef6e9] text-center">
              +63 912 345 6789
            </p>
          </div>

       import { NavLink } from 'react-router-dom'; 
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#04022d] text-[#fef6e9] border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Creme and Crumbs Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-serif text-xl">
              Crème & Crumbs
            </span>
          </div>
          <p className="mt-4 text-sm text-[#fef6e9]/70">
            Freshly baked treats made with love. Bringing sweetness to your everyday moments.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:underline">About</NavLink></li>
            <li><NavLink to="/articles" className="hover:underline">Articles</NavLink></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-[#fef6e9]/70">📍 Quezon City, Philippines</p>
          <p className="text-sm text-[#fef6e9]/70 mt-2">📞 +63 912 345 6789</p>
          <p className="text-sm text-[#fef6e9]/70 mt-2">✉️ cremecrumbs@email.com</p>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61580188506991"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-[#3b5998] p-3 rounded-3xl w-20"
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                alt="Facebook Icon"
                className="w-6 h-6"
              />
              <span className="mt-2 text-xs font-bold text-[#fef6e9] text-center">Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/cremecrumbs_bakehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-[#E1306C] p-3 rounded-3xl w-20"
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/042/127/166/small/instagram-logo-on-square-style-with-transparent-background-free-png.png"
                alt="Instagram Icon"
                className="w-6 h-6"
              />
              <span className="mt-2 text-xs font-bold text-[#fef6e9] text-center">Instagram</span>
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
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT DETAILS */}
      <section className="border-y-2 border-zinc-900 bg-[#f3ede6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Our Story
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Bringing Warmth to Every Bite
          </h2>
        </div>

        <p className="text-sm leading-7 text-zinc-600 sm:text-base">
          Crème & Crumbs Bakehouse started with a simple mission: to bring
          homemade goodness to everyone. From our signature cookies to our
          decadent cakes, every product is baked fresh daily. Follow us on our
          social media pages to keep up with our latest creations and special
          offers!
        </p>
      </section>

      <Button className="mt-5 bg-[#fef6e9]" to="/">
        Back Home
      </Button>
    </div>
  );
};

export default AboutPage;
