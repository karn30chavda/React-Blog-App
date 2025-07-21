function Button({
  buttonText,
  type = "button",
  bgcolor = "bg-[#28AFB0]",
  textcolor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium ${bgcolor} ${textcolor} hover:brightness-110 hover:shadow-md focus:ring-2 focus:ring-[#F4D35E] transition-all duration-300 ${className}`}
      {...props}
    >
      {buttonText}
    </button>
  );
}

export default Button;
