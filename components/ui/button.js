export function Button({ children, variant = "default", size = "md", ...props }) {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const variants = {
    default: "bg-blue-500 text-white",
    outline: "border border-blue-500 text-blue-500",
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
}
