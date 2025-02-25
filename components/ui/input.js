export default function input({ type = "text", className = "", ...props }) {
  return <input type={type} className={`border p-2 rounded ${className}`} {...props} />;
}
