import { PenLine } from "lucide-react";
function Logo({ fontsize = "2xl" }) {
  return (
    <div
      className={`flex justify-center items-center gap-2 font-bold text-${fontsize} text-[#F4D35E] tracking-wide`}
    >
      <PenLine className="w-6 h-6 text-[#F25F4C]" />
      Dev.<span className="text-[#28AFB0]">Blogs</span>
    </div>
  );
}

export default Logo;
