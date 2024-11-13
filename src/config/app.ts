import { CookieConfig } from "@/interface/config.types";

const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "app",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "app description",
};

const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
};

const COOKIE_CONFIG: CookieConfig = {
  loggedIn: `${APP_CONFIG.name}_isLoggedIn`,
  accessToken: `${APP_CONFIG.name}_accessToken`,
  refreshToken: `${APP_CONFIG.name}_refreshToken`,
  profile: `${APP_CONFIG.name}_profile`,
} as const;

export { APP_CONFIG, API_CONFIG, COOKIE_CONFIG };
