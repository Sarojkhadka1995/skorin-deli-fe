"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCartStore";
import { Loader2 } from "lucide-react";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearOrderInstructions = useCartStore((s) => s.clearOrderInstructions);
  const setCartData = useCartStore((s) => s.setCartData);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsVerifyingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const verificationStarted = useRef(false);

  useEffect(() => {
    const responseCode = searchParams.get("AccessCode");
    if (responseCode && !verificationStarted.current) {
      verificationStarted.current = true;
      setIsVerifyingPayment(true);
      setPaymentError(null);
      handlePaymentResponse(responseCode);
    }
  }, [searchParams]);

  const generateSharedAccessCode = async () => {
    try {
      setIsLoading(true);

      const paymentData = {
        Payment: {
          TotalAmount: 10000,
          InvoiceNumber: `INV-${Date.now()}`,
          InvoiceDescription: "Test Payment",
          CurrencyCode: "AUD",
        },
        RedirectUrl: `${window.location.origin}/checkout/payment-return`,
        CancelUrl: `${window.location.origin}/cart`,
        Method: "ProcessPayment",
        TransactionType: "Purchase",
      };

      const response = await fetch("/api/payment/create-shared-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.SharedPaymentUrl) {
        window.location.href = data.SharedPaymentUrl;
        setIsLoading(false);
      } else {
        console.error("Failed to get access code:", data.error);
      }
    } catch (error) {
      console.error("Error generating access code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentResponse = async (accessCode: string) => {
    try {
      const response = await fetch("/api/payment/get-payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Errors?.length > 0) {
        const msg = data.Errors[0].Message || "Payment failed";
        setIsVerifyingPayment(false);
        setPaymentError(msg);
        showToast(TOAST_TYPES.error, msg);
        return;
      }

      if (data.Transactions[0].ResponseMessage) {
        if (data.Transactions[0].ResponseMessage?.startsWith("A")) {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          setCartData([]);
          clearOrderInstructions();
          showToast(TOAST_TYPES.success, "Payment successful");
          router.push("/checkout/success");
        } else {
          setIsVerifyingPayment(false);
          setPaymentError("Payment failed");
          showToast(TOAST_TYPES.error, "Payment failed");
        }
      } else {
        setIsVerifyingPayment(false);
        setPaymentError("Payment failed");
        showToast(TOAST_TYPES.error, "Payment failed");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setIsVerifyingPayment(false);
      setPaymentError("Payment failed");
      showToast(TOAST_TYPES.error, "Payment failed");
    }
  };

  const accessCode = searchParams.get("AccessCode");
  if (accessCode) {
    if (paymentError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <p className="text-destructive font-medium mb-4">{paymentError}</p>
          <Button variant="outline-black" asChild>
            <Link href="/cart">Back to cart</Link>
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2
          className="h-10 w-10 animate-spin text-muted-foreground mb-4"
          aria-hidden
        />
        <p className="text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Button onClick={generateSharedAccessCode} disabled={isLoading}>
        Pay now {isLoading ? "Loading..." : "Pay now"}
      </Button>
    </div>
  );
}
