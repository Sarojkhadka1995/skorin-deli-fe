"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <CheckCircle2 className="h-16 w-16 text-green-600 mb-6" aria-hidden />
      <h1 className="text-3xl font-bold mb-2">Transaction successful</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Thank you for your order. Your payment has been processed successfully.
      </p>
      <Button variant="outline-black" size="lg" asChild>
        <Link href="/">Continue shopping</Link>
      </Button>
    </div>
  );
}
