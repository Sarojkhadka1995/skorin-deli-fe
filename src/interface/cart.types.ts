export interface ICart {
  userId: number;
  productId: number;
  quantity: number;
}

export interface ICartItem {
  id: number;
  price: string;
  product: {
    createdAt: string;
    description: string;
    featured: boolean;
    id: number;
    imageUrl: string;
    ingredients: null;
    name: string;
    slug: string;
    special: boolean;
    weight: string;
    price: string;
  };
  productId: number;
  quantity: number;
  total: string;
}
