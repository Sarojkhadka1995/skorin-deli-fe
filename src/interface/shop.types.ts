export interface IShop {
  id: number;
  name: string;
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
