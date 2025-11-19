"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginSchema, type LoginFormData } from "@/lib/validatior/authSchema";
import { useLogin } from "@/hooks/useLogin";
import BackButton from "./backButton";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  const onSubmit = (data: LoginFormData) => {
    try {
      login.mutate(data);
    } catch (error: any) {
      setError("root", {
        message: error.message || "Invalid email or password",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-[#4DAA57]">Welcome Back</h1>
        <p className="text-[#4DAA57]">Enter your credentials to sign in</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-[#4DAA57]"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4DAA57] hover:text-green-700 focus:outline-none cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Root Error */}
        {errors.root && (
          <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
          disabled={login.isPending}
        >
          {login.isPending ? <Spinner /> : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <BackButton href="/" />
        <p className="text-gray-600 dark:text-gray-400 flex-1 text-center">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#4DAA57] hover:text-[#3d8a47] underline font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
        {/* Empty div for balance */}
        <div className="w-12"></div>
      </div>
    </div>
  );
}
