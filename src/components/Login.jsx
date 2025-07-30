import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-[#893168]/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <Logo fontsize="4xl" />
          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-[#d6afd0]">
            Login Page
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="text-[#c288b8] font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md bg-[#1e1e20] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email address",
              },
            })}
          />

          <div className="relative">
            <Input
              label="Password:"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-[#1e1e20] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", { required: true })}
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-base rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;