"use client";
import {
  AuthResponse,
  LoginPayload,
  loginUser,
} from "@/app/api/clinet/userApi";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const { setUser, setToken, setLoading } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async (data) => {
      const response = await loginUser(data);
      return response.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      if (data?.result?.user && data?.result?.token) {
        const { user, token } = data.result;
        setUser(user);
        setToken(token);
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Unexpected response format");
      }
    },
    onError: (err: any) => {
      console.log("Login Error:", err);
      toast.error(err.response?.data?.message || "Login failed!");
    },
    onSettled: () => setLoading(false),
  });
};
