import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#070546]/20 bg-[#f3ede6] px-4 py-3 text-sm text-[#070546] outline-none transition placeholder:text-[#070546]/40 focus:border-[#070546] focus:bg-white";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      alert("Email already registered!");
      return;
    }

    // Save new user
    const newUser = {
      ...form,
      id: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    // reset form
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    // optional redirect
    navigate("/auth/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede6] px-6 py-12">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-lg border border-[#070546]/10 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#070546]">
          Create Your Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#070546]/70">
          Join Crème & Crumbs and enjoy fresh baked goodness delivered to you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#070546]">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                placeholder="John"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#070546]">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Doe"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#070546]">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
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
              className={inputClasses}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className={`${actionButtonClassName} bg-[#070546] text-[#f3ede6] hover:opacity-90`}
          >
            Create Account
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className={`${actionButtonClassName} border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]`}
            >
              Sign Up with Google
            </Button>

            <Button
              type="button"
              variant="secondary"
              className={`${actionButtonClassName} border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]`}
            >
              Sign Up with Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-[#070546]/10 pt-6 text-sm text-[#070546]/70">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-[#070546] hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
