import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#070546]/20 bg-[#f3ede6] px-4 py-3 text-sm text-[#070546] outline-none transition placeholder:text-[#070546]/40 focus:border-[#070546] focus:bg-white";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      const user = data.user ?? data;

      if (user.type === "viewer") {
        setError(
          "Viewer accounts do not have access to this application. Please contact an administrator.",
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (user.type === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err?.response?.status === 401 || err?.response?.status === 400
          ? "Invalid email or password."
          : err?.response?.data?.message ||
            "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede6] px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-lg border border-[#070546]/10 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#070546]">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#070546]/70">
          Sign in to continue enjoying fresh baked Crème &amp; Crumbs treats.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className={`${actionButtonClassName} bg-[#070546] text-[#f3ede6] hover:opacity-90 disabled:opacity-50`}
          >
            {loading ? "Signing in…" : "Log In"}
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
