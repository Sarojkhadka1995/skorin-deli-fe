import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SheetClose } from "@/components/ui/sheet";

interface CartTotalProps {
  total: number;
  onViewCart: () => void;
  onCheckout: () => void;
}

export default function CartCheckoutButtons({
  total = 238.92,
  onViewCart = () => console.log("View Cart clicked"),
  onCheckout = () => console.log("Checkout clicked"),
}: CartTotalProps) {
  return (
    <Card className="w-full max-w-sm border-none">
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium mb-2">Total</h2>
        <p className="text-4xl font-bold mb-2">${total.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          Tax included.{" "}
          <Link href="#" className="underline">
            Shipping
          </Link>{" "}
          calculated at checkout.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <SheetClose asChild>
          <Link href="/cart" className="w-full">
            <Button
              size={"lg"}
              variant="outline-black"
              className="w-full"
              onClick={onViewCart}
            >
              View Cart
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/cart" className="w-full">
            <Button
              size={"lg"}
              variant="outline"
              className="w-full"
              onClick={onCheckout}
            >
              Check Out
            </Button>
          </Link>
        </SheetClose>
      </CardFooter>
    </Card>
  );
}
