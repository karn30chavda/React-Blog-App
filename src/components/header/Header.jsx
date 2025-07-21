import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "..";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-[#1F271B] shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="flex items-center space-x-6">
            {navItem.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-white hover:text-[#EE964B] font-medium transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
