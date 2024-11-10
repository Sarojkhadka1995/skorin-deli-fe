export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  featured: boolean;
  slug: string;
  special: boolean;
  quantity: number;
}

// Base response type for common structure
interface IBaseProductResponse {
  status: string;
  data: {
    items: IProduct[];
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
