import { User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountAndCart() {
  return (
    <div className="lg:flex items-center gap-3 hidden">
      <Button size="lg" variant="outline" className="flex items-center gap-2">
        <User size={28} className="!h-[22px] !w-[22px]" />
        Account
      </Button>
      <Button
        size="lg"
        variant="outline-black"
        className="flex items-center gap-2"
      >
        <ShoppingCart size={28} className="!h-[22px] !w-[22px]" />
        $6.49 (1)
      </Button>
    </div>
  );
}
