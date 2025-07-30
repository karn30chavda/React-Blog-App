import { ChevronDown } from "lucide-react"; // Lucide ka icon
import { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-[#d6afd0]"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`appearance-none px-4 py-2 pr-10 rounded-lg bg-white text-[#1F271B] border border-[#cc8dc2] focus:outline-none focus:ring-2 focus:ring-[#28AFB0] focus:border-[#28AFB0] hover:cursor-pointer transition-all duration-200 w-full ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Icon positioned to the right */}
      <div className="pointer-events-none absolute top-10 right-3 text-[#1F271B]">
        <ChevronDown size={20} />
      </div>
    </div>
  );
}

export default Select;
