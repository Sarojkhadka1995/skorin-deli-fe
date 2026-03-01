export interface IBundleDealProduct {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
  };
}

export interface IBundleDealItem {
  id: string;
  status: boolean;
  name: string;
  quantity: number;
  description: string;
  discountType: "percentage" | "fixed";
  discountAmount: number;
  startDate: string;
  endDate: string;
  products: IBundleDealProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface IGetAllBundleDeals {
  data: IBundleDealItem[];
  totalPages?: number;
  page?: number;
  limit?: number;
}

export interface IAppliedBundleDiscount {
  dealId: string;
  dealName: string;
  discountAmount: number;
  applications: number;
  productIds: number[];
}
