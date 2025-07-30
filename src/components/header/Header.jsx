import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import Logo from "../../components/Logo";
import { logout } from "../../features/authSlice";
import { Button } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Blogs", slug: "/all-blogs", active: authStatus },
    { name: "Create blog", slug: "/create-blog", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <header className="bg-[#1f1f2e]/80 backdrop-blur-xl text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.slug}
                  to={item.slug}
                  className={({ isActive }) =>
                    `transition-all duration-200 text-sm font-medium cursor-pointer ${
                      isActive
                        ? "text-[#ff9f66] underline underline-offset-4"
                        : "text-white hover:text-[#ff9f66]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
          )}

          {authStatus && (
            <Button
              onClick={handleLogout}
              className="ml-3 bg-[#ff9f66] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#e14b68] transition-colors duration-300 cursor-pointer shadow-md"
            >
              Logout
            </Button>
          )}
        </nav>

        {/* Hamburger - Mobile */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-4 bg-[#1f1f2e]/95 px-6 py-5 rounded-xl backdrop-blur-sm">
          {navItems.map(
            (item) =>
              item.active && (
                <NavLink
                  key={item.slug}
                  to={item.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `transition-all duration-200 text-base font-medium cursor-pointer ${
                      isActive
                        ? "text-[#ff9f66] underline underline-offset-4"
                        : "text-white hover:text-[#ff9f66]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
          )}

          {authStatus && (
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="bg-[#ff9f66] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#e14b68] transition-colors duration-300 cursor-pointer shadow-md"
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
