import React, { FC, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { showToast } from "@/utils/toast-utils/toast-util";
import useProfileStore from "@/store/useProfileStore";
import { getProfile } from "@/services/auth/login.service";
import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { COOKIE_CONFIG } from "@/config/app";
import { getCookie } from "cookies-next";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  const { setProfile } = useProfileStore();
  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setProfile(profile);
      return;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to get profile";
      showToast(TOAST_TYPES.error, errorMessage);
    }
  };

  useEffect(() => {
    if (getCookie(COOKIE_CONFIG.loggedIn) === "true") {
      fetchProfile();
    }
  }, [getCookie(COOKIE_CONFIG.loggedIn)]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <Footer />
    </QueryClientProvider>
  );
};

export default Layout;
