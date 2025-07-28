function Button({
  children,
  type = "button",
  bgcolor = "bg-[#893168]",
  textcolor = "text-[#EAEAEA]",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-xl font-semibold tracking-wide uppercase ${bgcolor} ${textcolor} hover:brightness-110 hover:shadow-lg hover:cursor-pointer focus:ring-2 focus:ring-[#4A1942] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
