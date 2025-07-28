import { useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }) => {
  const id = useId();

  const baseStyles = `
    w-full px-4 py-2 rounded-xl
    bg-[#EAEAEA] text-[#2E1C2B] placeholder:text-gray-500
    border border-[#893168]
    focus:outline-none focus:ring-2 focus:ring-[#893168] focus:border-[#893168]
    transition-all duration-200 ease-in-out
  `;

  const fileStyles = `
    file:mr-4 file:py-2 file:px-4
    file:rounded-xl file:border-0
    file:text-sm file:font-semibold
    file:bg-[#893168] file:text-white
    hover:file:bg-[#6e2056]
    hover:cursor-pointer
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 pl-1 block text-sm font-medium text-[#d6afd0]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`
          ${baseStyles}
          ${type === "file" ? fileStyles : ""}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
