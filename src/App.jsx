import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { login, logout, setAuthReady } from "./features/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        dispatch(setAuthReady()); // ✅ Add this
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0E17] text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c0e0b0]" />
        <span className="ml-4 text-xl font-semibold">Loading Page...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col  bg-[#0F0E17] text-white">
      <Header />
      <main className=" flex-grow bg-[#0F0E17] text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
