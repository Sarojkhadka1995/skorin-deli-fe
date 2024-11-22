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
