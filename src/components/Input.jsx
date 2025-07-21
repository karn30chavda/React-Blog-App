import { useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-sm font-medium text-[#19647E]"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 rounded-lg bg-white text-[#1F271B] placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#28AFB0] focus:border-[#28AFB0] transition-all duration-200 w-full ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default Input;
