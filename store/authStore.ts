import { User } from '@/types/userType'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'


type AuthState = {
    user :User | null
    token :string | null
    loading :boolean
    setUser : (user :User | null) => void
    setToken : (token :string | null) => void
    setLoading : (loading :boolean) => void
    logout : () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user :null,
            token :null,
            loading :false,
            setUser : (user) => set({user}),
            setToken : (token) => set({token}),
            setLoading : (loading) => set({loading}),
            logout : () => set({user :null, token :null}),
        }),
        {
            name : 'auth-storage',
            partialize : (state) => ({user :state.user, token :state.token}),
        }
    )
)