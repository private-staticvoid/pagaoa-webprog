import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef6e9] text-[#070546] px-4">
      <h1 className="text-6xl font-bold mb-6">404</h1>

      <div className="mb-10">
        <img
          src="https://static.vecteezy.com/system/resources/previews/036/333/732/non_2x/black-and-white-cartoon-broken-robot-png.png"
          alt="Broken Robot"
          className="w-68 h-68 object-contain"
        />
      </div>

      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-center text-lg text-[#070546]/80 mb-6 max-w-md">
        The link you followed to get here must be broken or the page doesn’t
        exist.
      </p>

      <Link
        to="/"
        className="inline-block rounded-full border-2 border-[#070546] px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-[#070546] text-[#fef6e9] hover:bg-[#e8c07d] hover:text-black transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
