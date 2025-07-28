import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //  true && true !== true
    //  true && false
    // false (user is not logedin)
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }

    // false && true !== true
    // false && false
    // true (user is logedin)
    if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, authentication, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
