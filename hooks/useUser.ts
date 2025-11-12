"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useUser = () => {
  const { user, token, loading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  return {
    user,
    token,
    isLoading: loading || !isHydrated,
    isAuthenticated: !!token && !!user && isHydrated,
    isAdmin: user?.role === 'ADMIN',
    isAuthor: user?.role === 'AUTHOR',
    isHydrated,
  };
};