import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";

const loginUser = (data) =>
  axiosInstance.post("/auth/login", data).then((res) => res.data);

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      if (data.success) navigate("/profile");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200"
      >

        {/* Header */}
        <div className="bg-black text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold tracking-wide text-center">
            Login
          </h2>
        </div>

        {/* Form */}
        <div className="p-8 space-y-5">

          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {isError && (
            <p className="text-red-500 text-sm text-center">
              {error.response?.data?.message || "Invalid email or password"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition duration-200 disabled:bg-gray-400"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-black font-semibold hover:underline">
              Register
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
};

export default Login;