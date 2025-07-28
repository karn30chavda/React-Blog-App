function Logo({ fontsize = "xl" }) {
  return (
    <div className={`font-bold text-${fontsize} text-[#F4D35E] tracking-wide`}>
      Karan<span className="text-[#28AFB0]">.dev</span>
    </div>
  );
}

export default Logo;
