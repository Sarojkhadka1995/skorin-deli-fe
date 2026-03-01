export interface ICategory {
  id: number;
  name: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  featured: boolean;
}

export interface ICategoryResponse {
  status: string;
  data: {
    items: ICategory[];
    total: number;
    pageNumber: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICategoryPaginationParams {
  pageNumber?: number;
  limit?: number;
  status?: string;
  featured?: boolean;
}
