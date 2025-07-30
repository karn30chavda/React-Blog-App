import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const { status: authStatus, isAuthReady } = useSelector(
    (state) => state.auth
  );

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0E17] text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#c0e0b0]" />
        <span className="ml-4 text-xl font-semibold">Loading Auth...</span>
      </div>
    );
  }

  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
}
