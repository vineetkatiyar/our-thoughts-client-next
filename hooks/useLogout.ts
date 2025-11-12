import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  return () => {
    logout();
    router.push("/signin");
  };
};
