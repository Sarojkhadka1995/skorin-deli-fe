import { ICategory } from "./category.types";

export interface IShop {
  id: number;
  name: string;
  slug: string;
  categories: ICategory[];
}

export interface IShopResponse {
  status: string;
  data: {
    items: IShop[];
    total: number;
    pageNumber: number;
    limit: number;
    totalPages: number;
  };
}
