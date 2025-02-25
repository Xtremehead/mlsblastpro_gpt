export default function Input({ type = "text", className = "", ...props }) {
  return <input type={type} className={`border p-2 rounded ${className}`} {...props} />;
}
