export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  imageUrl: string;
  featured: boolean;
  slug: string;
  special: boolean;
  quantity: number;
}

export interface IProductDetail {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  featured: boolean;
  slug: string;
  special: boolean;
  quantity: number;
  createdAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    featured: boolean;
    shopId: number;
  };
  ingredients: string | undefined;
  nutritionInfo:
    | {
        id: number;
        nutrient: string;
        per100gOrMl: string;
        perServing: string;
        percentDI: string;
      }[]
    | undefined;
}

// Base response type for common structure
interface IBaseProductResponse {
  status: string;
  data: {
    items: IProductDetail[];
    total: number;
    pageNumber: number;
    limit: number;
    totalPages: number;
  };
}

// Regular products response
export type IProductResponse = IBaseProductResponse;

// Featured products response
export type IFeaturedProductResponse = IBaseProductResponse;

// Special products response
export type ISpecialProductResponse = IBaseProductResponse;

// Type for pagination params
export interface IProductPaginationParams {
  pageNumber?: number;
  limit?: number;
}
