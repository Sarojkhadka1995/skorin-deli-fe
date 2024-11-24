export interface IOrder {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface ICreateOrder {
  userId: number;
  items: IOrder[];
  orderInstructions?: string;
}

export interface IOrderHistory {
  id: number;
  items: IOrder[];
  shippingAddress: string;
  paymentMethod: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  orderInstructions: string | null;
}
