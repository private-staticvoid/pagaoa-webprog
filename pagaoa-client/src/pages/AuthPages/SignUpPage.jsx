import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

// ─── Styles ───────────────────────────────────────────────────────────────────
const inputCls =
  "mt-1 w-full rounded-lg border border-[#070546]/20 bg-[#f3ede6] px-3 py-1.5 text-xs text-[#070546] outline-none transition placeholder:text-[#070546]/40 focus:border-[#070546] focus:bg-white";

const selectCls =
  "mt-1 w-full rounded-lg border border-[#070546]/20 bg-[#f3ede6] px-3 py-1.5 text-xs text-[#070546] outline-none transition focus:border-[#070546] focus:bg-white appearance-none cursor-pointer";

const labelCls = "text-xs font-medium text-[#070546]";
const errorCls = "mt-0.5 text-[10px] text-red-500";

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES = [{ value: "viewer", label: "Viewer – read-only access" }];
const GENDERS = ["male", "female", "other"];

const BLANK = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
};

// ─── Component ────────────────────────────────────────────────────────────────
const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(BLANK);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: "" }));
    if (apiError) setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required.";
    if (!form.lastName.trim()) errs.lastName = "Required.";
    if (!form.age.trim()) errs.age = "Required.";
    else if (!/^\d+$/.test(form.age.trim())) errs.age = "Must be a number.";
    if (!form.gender) errs.gender = "Required.";
    if (!form.contactNumber.trim()) errs.contactNumber = "Required.";
    else if (!/^\d{11}$/.test(form.contactNumber.trim()))
      errs.contactNumber = "Must be 11 digits.";
    if (!form.email.trim()) errs.email = "Required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Invalid email.";
    if (!form.username.trim()) errs.username = "Required.";
    else if (/\s/.test(form.username)) errs.username = "No spaces allowed.";
    if (!form.password) errs.password = "Required.";
    else if (form.password.length < 8) errs.password = "Min. 8 characters.";
    if (!form.address.trim()) errs.address = "Required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender,
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        type: "viewer",
        username: form.username.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        isActive: true,
      });
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

  // helpers
  const fe = (name) =>
    fieldErrors[name] ? <p className={errorCls}>{fieldErrors[name]}</p> : null;
  const ic = (name) =>
    `${inputCls} ${fieldErrors[name] ? "border-red-400" : ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3ede6] px-4 py-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg border border-[#070546]/10 px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-serif font-bold text-[#070546]">
            Create Your Account
          </h1>
          <p className="mt-1 text-xs text-[#070546]/60">
            Join Crème &amp; Crumbs and enjoy fresh baked goodness.
          </p>
        </div>

        {apiError && (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                placeholder="John"
                className={ic("firstName")}
              />
              {fe("firstName")}
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Doe"
                className={ic("lastName")}
              />
              {fe("lastName")}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Age</label>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="text"
                placeholder="25"
                className={ic("age")}
              />
              {fe("age")}
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`${selectCls} ${fieldErrors.gender ? "border-red-400" : ""}`}
              >
                <option value="">Select</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
              {fe("gender")}
            </div>
            <div>
              <label className={labelCls}>Contact Number</label>
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                type="text"
                placeholder="09XXXXXXXXX"
                className={ic("contactNumber")}
              />
              {fe("contactNumber")}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className={ic("email")}
              />
              {fe("email")}
            </div>
            <div>
              <label className={labelCls}>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                placeholder="johndoe"
                className={ic("username")}
              />
              {fe("username")}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Account Role</label>

              <select
                name="type"
                value="viewer"
                disabled
                className={selectCls + " opacity-60 cursor-not-allowed"}
              >
                <option value="viewer">Viewer</option>
              </select>
              <p className="mt-0.5 text-[10px] text-[#070546]/40">
                Admin accounts require an existing admin.
              </p>
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className={ic("password")}
              />
              {fe("password")}
            </div>
          </div>

          <div>
            <label className={labelCls}>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              placeholder="123 Main St, City"
              className={`${ic("address")} resize-none`}
            />
            {fe("address")}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full rounded-lg py-2 text-[11px] tracking-[0.2em] bg-[#070546] text-[#f3ede6] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating Account…" : "Create Account"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-lg py-2 text-[11px] tracking-[0.2em] border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]"
            >
              Sign Up with Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-lg py-2 text-[11px] tracking-[0.2em] border border-[#070546] text-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]"
            >
              Sign Up with Apple
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 border-t border-[#070546]/10 pt-3 text-xs text-[#070546]/60">
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
