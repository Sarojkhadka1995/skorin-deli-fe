"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Fake order data
const orders = [
  {
    id: 1,
    name: "Summer T-Shirt",
    date: "2023-06-15",
    status: "Delivered",
    total: 19.99,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    date: "2023-06-10",
    status: "Shipped",
    total: 89.99,
  },
  {
    id: 3,
    name: "Laptop Stand",
    date: "2023-06-05",
    status: "Processing",
    total: 29.99,
  },
  {
    id: 4,
    name: "Smart Watch",
    date: "2023-05-30",
    status: "Delivered",
    total: 199.99,
  },
  {
    id: 5,
    name: "Desk Lamp",
    date: "2023-05-25",
    status: "Cancelled",
    total: 39.99,
  },
];

// Fake order details
const getOrderDetails = (id) => ({
  id,
  items: [
    { name: "Product 1", quantity: 2, price: 9.99 },
    { name: "Product 2", quantity: 1, price: 14.99 },
  ],
  shippingAddress: "123 Main St, Anytown, AN 12345",
  paymentMethod: "Credit Card ending in 1234",
});

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Button variant="link" onClick={() => setSelectedOrder(order)}>
                  {order.name}
                </Button>
              </TableCell>
              <TableCell>
                {format(new Date(order.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
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
            <DialogDescription>
              Order #{selectedOrder?.id} - {selectedOrder?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(selectedOrder.date), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <Package className="mr-2 h-4 w-4" />
                <span>{selectedOrder.status}</span>
              </div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside mb-4">
                {getOrderDetails(selectedOrder.id).items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Qty: {item.quantity} - $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mb-2">
                <strong>Shipping Address:</strong>{" "}
                {getOrderDetails(selectedOrder.id).shippingAddress}
              </p>
              <p className="mb-2">
                <strong>Payment Method:</strong>{" "}
                {getOrderDetails(selectedOrder.id).paymentMethod}
              </p>
              <p className="text-lg font-semibold mt-4">
                Total: ${selectedOrder.total.toFixed(2)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
