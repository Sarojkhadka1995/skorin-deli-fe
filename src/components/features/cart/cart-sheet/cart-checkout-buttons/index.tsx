import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SheetClose } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

interface CartTotalProps {
  total: number;
  onCheckout: () => void;
  checkoutLoading: boolean;
}

export default function CartCheckoutButtons({
  total,
  onCheckout,
  checkoutLoading = false,
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
            <Button size={"lg"} variant="outline-black" className="w-full">
              View Cart
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Button
            size={"lg"}
            variant="outline"
            className="w-full"
            disabled={checkoutLoading}
            onClick={onCheckout}
          >
            Check Out {checkoutLoading && <Loader2 className="w-4 h-4 ml-2" />}
          </Button>
        </SheetClose>
      </CardFooter>
    </Card>
  );
}
