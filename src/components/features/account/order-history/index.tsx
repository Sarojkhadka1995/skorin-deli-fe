import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";
import { OrderHistorySkeleton } from "./orderHistorySkeleton";
import { IOrder, IOrderHistory } from "@/interface/order.types";

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<IOrderHistory | null>(
    null
  );

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => getOrders(),
  });

  console.log(orders);
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="ps-6">Order Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <OrderHistorySkeleton />}
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Button variant="link" onClick={() => setSelectedOrder(order)}>
                  {order.id}
                </Button>
              </TableCell>
              <TableCell>
                {format(new Date(order.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right">${order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order #{selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(selectedOrder.createdAt), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <Package className="mr-2 h-4 w-4" />
                <span>{selectedOrder.status}</span>
              </div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside mb-4">
                {selectedOrder.items.map((item: IOrder, index: number) => (
                  <li key={index}>
                    {item.productName} - Qty: {item.quantity} - $
                    {item.productPrice}
                  </li>
                ))}
              </ul>
              {/* <p className="mb-2">
                <strong>Shipping Address:</strong>{" "}
                {getOrderDetails(selectedOrder.id).shippingAddress}
              </p>
              <p className="mb-2">
                <strong>Payment Method:</strong>{" "}
                {getOrderDetails(selectedOrder.id).paymentMethod}
              </p> */}
              <p className="text-lg font-semibold mt-4">
                Total: ${selectedOrder.totalAmount}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
