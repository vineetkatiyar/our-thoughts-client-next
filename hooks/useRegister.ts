import { AuthResponse, RegisterPaylod, registerUser } from "@/app/api/clinet/userApi";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { toast } from "sonner";


export const useRegister = () =>{
    const router = useRouter();
    const {
        setUser,
        setToken,
        setLoading
    } = useAuthStore();

    return useMutation<AuthResponse, Error, RegisterPaylod>({
        mutationFn: async (data) => {
            const res = await registerUser(data);
            return res.data; 
        },
        onMutate : () => setLoading(true),
        onSuccess: (data) => {
            const { user, token } = data.result;
            setUser(user);
            setToken(token);
            toast.success("Registration successful!");
            router.push("/dashboard");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Registration failed!");
        },
        onSettled: () => {
            setLoading(false);
        }
    })
}