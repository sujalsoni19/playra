import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../api/user.api.js";
import { useNavigate } from "react-router-dom";

const imageSchema = z
  .any()
  .refine((file) => file?.[0], "Image is required")
  .refine(
    (file) => file[0]?.type.startsWith("image/"),
    "Only image files are allowed",
  );

const schema = z.object({
  fullName: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "username is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  avatar: imageSchema,
  coverImage: imageSchema.optional(),
});

function Register() {
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

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
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      if (data.coverImage?.[0]) {
        formData.append("coverImage", data.coverImage[0]);
      }

      setServerError("");
      await registerUser(formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      reset();
      navigate("/login");
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
        <h1 className="text-2xl">Register</h1>
        <p className="text-sm mt-2">
          Already registered?{" "}
          <Link className="underline" to="/login">
            Login
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
          <div className="flex flex-col gap-1 sm:gap-2">
            <input
              type="text"
              placeholder="fullname"
              {...register("fullName")}
              className="w-full border rounded-xl px-3 py-2"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.fullName?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="username"
              {...register("username")}
              className="w-full border rounded-xl px-3 py-2"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.username?.message}
            </p>
          </div>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="file"
              id="avatar"
              placeholder="avatar"
              accept="image/png, image/jpeg"
              {...register("avatar")}
              className="
                    w-full rounded-xl border border-white bg-[#0B0B0C] px-3 py-2 text-sm text-zinc-300
                    file:mr-4 file:rounded-full file:border-0
                    file:bg-cyan-500 file:px-4 file:py-1
                    file:text-sm file:font-semibold file:text-white
                    hover:file:bg-cyan-400
                    cursor-pointer
                    transition-colors"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.avatar?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coverImage">cover Image(optional):</label>
            <input
              type="file"
              id="coverImage"
              placeholder="coverImage"
              accept="image/png, image/jpeg"
              {...register("coverImage")}
              className="
                    w-full rounded-xl border border-white bg-[#0B0B0C] px-3 py-2 text-sm text-zinc-300
                    file:mr-4 file:rounded-full file:border-0
                    file:bg-cyan-500 file:px-4 file:py-1
                    file:text-sm file:font-semibold file:text-white
                    hover:file:bg-cyan-400
                    cursor-pointer
                    transition-colors"
            />
            <p className="text-red-600 text-center text-sm">
              {errors.coverImage?.message}
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
            <span>Register</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default Register;
