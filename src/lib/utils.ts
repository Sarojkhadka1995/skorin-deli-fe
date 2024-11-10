import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imageUrl: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${imageUrl}`;
};

// Helper function to convert sort option to API parameter
export const getSortValue = (sort: string) => {
  switch (sort) {
    case "price_asc":
      return "price-ascending";
    case "price_desc":
      return "price-descending";
    case "name_asc":
      return "name-ascending";
    case "name_desc":
      return "name-descending";
    case "newest":
      return "created-descending";
    default:
      return "";
  }
};
