import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#EE964B] text-white px-5 py-2 rounded-md border border-[#F4D35E] hover:bg-[#19647E] transition-colors duration-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
