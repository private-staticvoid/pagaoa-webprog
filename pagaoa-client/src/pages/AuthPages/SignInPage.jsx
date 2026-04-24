import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#070546]/20 bg-[#f3ede6] px-4 py-3 text-sm text-[#070546] outline-none transition placeholder:text-[#070546]/40 focus:border-[#070546] focus:bg-white";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find user match
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password,
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // save logged-in user (session)
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful!");

    // ✅ redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede6] px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-lg border border-[#070546]/10 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#070546]">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#070546]/70">
          Sign in to continue enjoying fresh baked Crème & Crumbs treats.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-[#070546]">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#070546]">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClasses}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#070546]/70">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#070546]/30 accent-[#070546]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-[#070546] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={`${actionButtonClassName} bg-[#070546] text-[#f3ede6] hover:opacity-90`}
          >
            Log In
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className={`${actionButtonClassName} border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]`}
            >
              Log In with Google
            </Button>

            <Button
              type="button"
              variant="secondary"
              className={`${actionButtonClassName} border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]`}
            >
              Log In with Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-[#070546]/10 pt-6 text-sm text-[#070546]/70">
          No account yet?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-[#070546] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
