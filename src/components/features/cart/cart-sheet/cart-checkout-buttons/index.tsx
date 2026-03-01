import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <div className="px-6 pb-6">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Total</p>
        <p className="text-3xl font-bold text-foreground">
          ${total.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Tax included.{" "}
          <Link
            href="#"
            className="underline hover:text-foreground transition-colors"
          >
            Shipping
          </Link>{" "}
          calculated at checkout.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <SheetClose asChild>
          <Link href="/cart" className="w-full">
            <Button size="lg" variant="outline-black" className="w-full">
              View Cart
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            disabled={checkoutLoading}
            onClick={onCheckout}
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Check Out"
            )}
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
