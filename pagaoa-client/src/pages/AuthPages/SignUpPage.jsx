import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#070546]/20 bg-[#f3ede6] px-4 py-3 text-sm text-[#070546] outline-none transition placeholder:text-[#070546]/40 focus:border-[#070546] focus:bg-white";

const selectClasses =
  "mt-2 w-full rounded-xl border border-[#070546]/20 bg-[#f3ede6] px-4 py-3 text-sm text-[#070546] outline-none transition focus:border-[#070546] focus:bg-white appearance-none cursor-pointer";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const ROLES = [
  { value: "editor", label: "Editor – can create & manage articles" },
  { value: "viewer", label: "Viewer – read-only access" },
];

const GENDERS = ["male", "female", "other"];

const BLANK = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor", // matches mongoose field name
  username: "",
  password: "",
  address: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(BLANK);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.age.trim()) errs.age = "Age is required.";
    else if (!/^\d+$/.test(form.age.trim())) errs.age = "Age must be a number.";
    if (!form.gender) errs.gender = "Gender is required.";
    if (!form.contactNumber.trim())
      errs.contactNumber = "Contact number is required.";
    else if (!/^\d{11}$/.test(form.contactNumber.trim()))
      errs.contactNumber = "Contact number must be 11 digits.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email address.";
    if (!form.username.trim()) errs.username = "Username is required.";
    else if (/\s/.test(form.username))
      errs.username = "Username must not contain spaces.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (!form.address.trim()) errs.address = "Address is required.";
    return errs;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender,
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type, // "editor" | "viewer"
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: true,
    };

    try {
      await createUser(payload);
      navigate("/auth/signin", {
        state: { message: "Account created! Please sign in." },
      });
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Field error helper ────────────────────────────────────────────────────
  const err = (name) =>
    fieldErrors[name] ? (
      <p className="mt-1 text-xs text-red-600">{fieldErrors[name]}</p>
    ) : null;

  const inputCls = (name) =>
    `${inputClasses} ${fieldErrors[name] ? "border-red-400" : ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede6] px-6 py-12">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-lg border border-[#070546]/10 p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#070546]">
          Create Your Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#070546]/70">
          Join Crème &amp; Crumbs and enjoy fresh baked goodness delivered to
          you.
        </p>

        {/* ── API Error ──────────────────────────────────────────────────────── */}
        {apiError && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name Row */}
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
                className={inputCls("firstName")}
              />
              {err("firstName")}
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
                className={inputCls("lastName")}
              />
              {err("lastName")}
            </div>
          </div>

          {/* Age & Gender Row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#070546]">Age</label>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="text"
                placeholder="25"
                className={inputCls("age")}
              />
              {err("age")}
            </div>
            <div>
              <label className="text-sm font-medium text-[#070546]">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`${selectClasses} ${fieldErrors.gender ? "border-red-400" : ""}`}
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
              {err("gender")}
            </div>
          </div>

          {/* Contact & Email Row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#070546]">
                Contact Number
              </label>
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                type="text"
                placeholder="09XXXXXXXXX"
                className={inputCls("contactNumber")}
              />
              {err("contactNumber")}
            </div>
            <div>
              <label className="text-sm font-medium text-[#070546]">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className={inputCls("email")}
              />
              {err("email")}
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-[#070546]">
              Account Role
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className={selectClasses}
            >
              {ROLES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[#070546]/50">
              Admin accounts can only be created by an existing admin.
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium text-[#070546]">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="johndoe"
              className={inputCls("username")}
            />
            {err("username")}
          </div>

          {/* Password */}
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
              className={inputCls("password")}
            />
            {err("password")}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-[#070546]">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              placeholder="123 Main St, City"
              className={`${inputCls("address")} resize-none`}
            />
            {err("address")}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className={`${actionButtonClassName} bg-[#070546] text-[#f3ede6] hover:opacity-90 disabled:opacity-50`}
          >
            {loading ? "Creating Account…" : "Create Account"}
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
