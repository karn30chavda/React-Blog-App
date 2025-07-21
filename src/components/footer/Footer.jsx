import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-[#1F271B] text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-[#19647E]">
                &copy; {new Date().getFullYear()} All Rights Reserved by{" "}
                <span className="text-[#F4D35E] font-semibold">Karan Dev</span>
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-sm font-semibold uppercase text-[#28AFB0] tracking-wide">
              Company
            </h3>
            <ul>
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item, idx) => (
                  <li key={idx} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-[#EE964B] transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-5 text-sm font-semibold uppercase text-[#28AFB0] tracking-wide">
              Support
            </h3>
            <ul>
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item, idx) => (
                  <li key={idx} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-[#EE964B] transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-5 text-sm font-semibold uppercase text-[#28AFB0] tracking-wide">
              Legals
            </h3>
            <ul>
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item, idx) => (
                  <li key={idx} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-[#EE964B] transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
