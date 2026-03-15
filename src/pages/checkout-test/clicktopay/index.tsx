"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { Button } from "@/components/ui/button";

const TransparentRedirectPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [formActionUrl, setFormActionUrl] = useState<string | null>(null);
  // const [accessCode, setAccessCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const responseCode = searchParams.get("AccessCode");
    if (responseCode) {
      handlePaymentResponse(responseCode);
      return;
    }
    // Not working
    // createTransaction();
    // generateAccessCode();
    // generateSharedAccessCode(); //This is working triggered on button click
  }, [searchParams, router]);

  // const generateAccessCode = async () => {
  //   try {
  //     setError(null);
  //     setIsLoading(true);

  //     const paymentData = {
  //       Payment: {
  //         TotalAmount: 10000,
  //         InvoiceNumber: `INV-${Date.now()}`,
  //         InvoiceDescription: "Test Payment",
  //         CurrencyCode: "AUD",
  //       },
  //       RedirectUrl: `${window.location.origin}/checkout/clicktopay`,
  //       CancelUrl: `${window.location.origin}/checkout/cancel`,
  //       Method: "ProcessPayment",
  //       TransactionType: "Purchase",
  //     };

  //     const response = await fetch("/api/payment/create-access-code", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(paymentData),
  //     });

  //     const data = await response.json();
  //     debugger;
  //     if (data.AccessCode && data.FormActionURL) {
  //       setAccessCode(data.AccessCode);
  //       setFormActionUrl(data.FormActionURL);
  //       setIsLoading(false);
  //     } else {
  //       setError("Payment initialization failed. Please try again.");
  //       console.error("Failed to get access code:", data.error);
  //     }
  //   } catch (error) {
  //     setError("Something went wrong. Please try again.");
  //     console.error("Error generating access code:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //shared payment url

  const generateSharedAccessCode = async () => {
    try {
      // setError(null);
      setIsLoading(true);

      const paymentData = {
        Payment: {
          TotalAmount: 10000,
          InvoiceNumber: `INV-${Date.now()}`,
          InvoiceDescription: "Test Payment",
          CurrencyCode: "AUD",
        },
        RedirectUrl: `${window.location.origin}/checkout/clicktopay`,
        CancelUrl: `${window.location.origin}/checkout/cancel`,
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
        // setError("Payment initialization failed. Please try again.");
        console.error("Failed to get access code:", data.error);
      }
    } catch (error) {
      // setError("Something went wrong. Please try again.");
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

      // const exampleResponse = {
      //   Transactions: [
      //     {
      //       AuthorisationCode: "268309",
      //       ResponseCode: "00",
      //       ResponseMessage: "A2000",
      //       InvoiceNumber: "INV-1738908499821",
      //       InvoiceReference: "",
      //       TotalAmount: 1000,
      //       TransactionID: 39946119,
      //       TransactionStatus: true,
      //       TokenCustomerID: null,
      //       BeagleScore: null,
      //       Options: [],
      //       Verification: {
      //         CVN: 0,
      //         Address: 0,
      //         Email: 0,
      //         Mobile: 0,
      //         Phone: 0,
      //       },
      //       BeagleVerification: {
      //         Email: 0,
      //         Phone: 0,
      //       },
      //       Customer: {
      //         TokenCustomerID: null,
      //         Reference: null,
      //         Title: "Mr.",
      //         FirstName: null,
      //         LastName: null,
      //         CompanyName: null,
      //         JobDescription: null,
      //         Street1: null,
      //         Street2: "",
      //         City: "",
      //         State: "",
      //         PostalCode: "",
      //         Country: "",
      //         Email: "",
      //         Phone: "",
      //         Mobile: null,
      //         Comments: null,
      //         Fax: null,
      //         Url: null,
      //       },
      //       CustomerNote: null,
      //       ShippingAddress: {
      //         ShippingMethod: null,
      //         FirstName: "",
      //         LastName: "",
      //         Street1: "",
      //         Street2: "",
      //         City: "",
      //         State: "",
      //         Country: "",
      //         PostalCode: "",
      //         Email: "",
      //         Phone: "",
      //         Fax: null,
      //       },
      //     },
      //   ],
      //   Errors: "",
      // };

      if (data.Errors?.length > 0) {
        console.error("Payment status error:", data.error);
        showToast(
          TOAST_TYPES.error,
          data.Errors[0].Message || "Payment failed",
        );
        return;
      }

      if (data.Transactions[0].ResponseMessage) {
        if (data.Transactions[0].ResponseMessage?.startsWith("A")) {
          showToast(TOAST_TYPES.success, "Payment successful");
        } else {
          showToast(TOAST_TYPES.error, "Payment failed");
        }
      } else {
        console.error("Failed to get transaction status");

        showToast(TOAST_TYPES.error, "Payment failed");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);

      showToast(TOAST_TYPES.error, "Payment failed");
    }
  };

  // Not working
  // const createTransaction = async () => {
  //   try {
  //     const response = await fetch("/api/payment/create-transaction", {
  //       method: "POST",
  //     });
  //     const data = await response.json();
  //     console.log("data ====", data);
  //   } catch (error) {
  //     console.error("Error creating transaction:", error);
  //   }
  // };
  // if (isLoading) {
  //   return <div>Initializing payment form...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
  //       <div className="text-red-600">{error}</div>
  //       <button
  //         onClick={generateAccessCode}
  //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
  //       >
  //         Retry Payment
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* {formActionUrl && accessCode && (
        <form
          method="POST"
          action={formActionUrl}
          className="w-full max-w-md space-y-4"
        >
          <input type="hidden" name="EWAY_ACCESSCODE" value={accessCode} />

          <div className="space-y-2">
            <label
              htmlFor="EWAY_CARDNAME"
              className="block text-sm font-medium"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="EWAY_CARDNAME"
              name="EWAY_CARDNAME"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="EWAY_CARDNUMBER"
              className="block text-sm font-medium"
            >
              Card Number
            </label>
            <input
              type="text"
              id="EWAY_CARDNUMBER"
              name="EWAY_CARDNUMBER"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="EWAY_CARDEXPIRYMONTH"
                className="block text-sm font-medium"
              >
                Expiry Month
              </label>
              <input
                type="text"
                id="EWAY_CARDEXPIRYMONTH"
                name="EWAY_CARDEXPIRYMONTH"
                placeholder="MM"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="EWAY_CARDEXPIRYYEAR"
                className="block text-sm font-medium"
              >
                Expiry Year
              </label>
              <input
                type="text"
                id="EWAY_CARDEXPIRYYEAR"
                name="EWAY_CARDEXPIRYYEAR"
                placeholder="YY"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="EWAY_CARDCVN" className="block text-sm font-medium">
              CVV/CVN
            </label>
            <input
              type="text"
              id="EWAY_CARDCVN"
              name="EWAY_CARDCVN"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Pay Now
          </button>
        </form>
      )} */}

      <Button onClick={generateSharedAccessCode} disabled={isLoading}>
        Pay now {isLoading ? "Loading..." : "Pay now"}
      </Button>
    </div>
  );
};

export default TransparentRedirectPage;
