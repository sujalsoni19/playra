import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { z } from "zod";
import { useUsercontext } from "../context/UserContext.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../api/user.api.js";
import { useNavigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function Login() {
  const { setUser } = useUsercontext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onFormSubmit = async (data) => {
    try {
      setServerError("");

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      setUser(response.data?.data?.user);
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setServerError(message);
    }
  };

  return (
    <div className="flex justify-center flex-col text-white gap-4 mt-4 px-1 py-3 sm:p-2 border border-white w-[90vw] sm:w-[30vw] rounded-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl">
          Welcome back to <span className="text-cyan-400">Playra</span>
        </h1>
        <p className="text-sm mt-2">
          New here?{" "}
          <Link className="underline" to="/register">
            Create an account
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="w-[90%] py-1 mx-auto flex flex-col gap-2 sm:gap-4">
          {serverError && (
            <p className="text-red-500 text-center text-sm font-medium">
              {serverError}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="email"
              {...register("email")}
              className="w-full border rounded-xl px-3 py-2"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="password"
              {...register("password")}
              className="w-full border rounded-xl px-3 py-2"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.password?.message}
            </p>
          </div>
        </div>
        <div className="flex items-center py-2 justify-center">
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="p-3 px-6 cursor-pointer rounded-full flex gap-1 border border-cyan-400 justify-between bg-[#121212] text-cyan-400"
          >
            <span>Login</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default Login;
