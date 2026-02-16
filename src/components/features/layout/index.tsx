import React, { FC, useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { showToast } from "@/utils/toast-utils/toast-util";
import useProfileStore from "@/store/useProfileStore";
// import { getProfile } from "@/services/auth/login.service";
import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { COOKIE_CONFIG } from "@/config/app";
import { getCookie } from "cookies-next";
import { getProfile } from "@/service/account.service";
import { AxiosError } from "axios";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setProfile } = useProfileStore();
  const [isMounted, setIsMounted] = useState(false);

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      if (profile.data) {
        setProfile(profile.data);
      }
    } catch (error: unknown) {
      // Don't show error toast for 401 errors as they're handled by the interceptor
      if (
        (error as AxiosError<{ message: string }>)?.response?.status !== 401
      ) {
        const errorMessage =
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Unable to get profile";
        console.error("Profile fetch error:", errorMessage);
        // Only show toast for non-401 errors
        showToast(TOAST_TYPES.error, errorMessage as string);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && getCookie(COOKIE_CONFIG.loggedIn) === "true") {
      // Small delay to ensure cookies are properly set after login redirect
      const timer = setTimeout(() => {
        fetchProfile();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
