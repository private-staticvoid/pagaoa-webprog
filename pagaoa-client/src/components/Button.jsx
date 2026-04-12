import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-[#070546] text-[#f3ede6] border-[#070546] hover:bg-[#f3ede6] hover:text-[#070546]",
  secondary:
    "bg-[#f3ede6] text-[#070546] border-[#070546] hover:bg-[#070546] hover:text-[#f3ede6]",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition duration-300 ease-in-out",
    variantClasses[variant],
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
