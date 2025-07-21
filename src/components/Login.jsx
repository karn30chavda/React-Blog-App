import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authlogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";

function Login() {
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    seterror("");
    try {
      const userData = await authService.login(data);
      if (userData) dispatch(authlogin(userData));
      navigate("/");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#1F271B] px-4">
      <div className="mx-auto w-full max-w-lg bg-[#F4D35E] rounded-xl p-10 shadow-lg border border-[#28AFB0]">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold text-[#1F271B]">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-[#19647E]">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-[#EE964B] hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email:"
            placeholder="Enter your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your Password"
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
