import { Github, Linkedin } from "lucide-react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-[#2E1C2B]/90 backdrop-blur-xl text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Text */}
        <div className="flex flex-col items-center md:items-start">
          <Logo width="100px" />
          <p className="text-sm mt-2 text-[#EAEAEA]/70">
            &copy; {new Date().getFullYear()} All rights reserved by{" "}
            <span className="text-[#F4D35E] font-semibold">Karan Dev</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4D35E] transition duration-300 cursor-pointer"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4D35E] transition duration-300 cursor-pointer"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
