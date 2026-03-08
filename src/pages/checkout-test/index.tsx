"use client";
import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import Script from "next/script";

// Types
interface CardDetails {
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvn: string;
}

const CheckoutTest = () => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvn: "",
  });
  const [paymentStatus, setPaymentStatus] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const validateForm = (): boolean => {
    const { cardName, cardNumber, expiryMonth, expiryYear, cvn } = cardDetails;
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvn) {
      setPaymentStatus({ message: "All fields are required", type: "error" });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    try {
      if (!validateForm()) return;

      const response = await axios.post("http://localhost:8080/api/payment", {
        cardDetails,
      });
      setPaymentStatus({
        message: response.data.message,
        type: "success",
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Payment failed"
          : "Payment failed";

      setPaymentStatus({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleScriptLoad = () => {
    console.log("eWAY script loaded successfully");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="cardName"
          placeholder="Cardholder Name"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="expiryMonth"
          placeholder="Expiry Month"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="expiryYear"
          placeholder="Expiry Year"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cvn"
          placeholder="CVN"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
        {paymentStatus.message && (
          <p
            className={`${
              paymentStatus.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {paymentStatus.message}
          </p>
        )}
      </div>

      <Script
        src="https://secure.ewaypayments.com/scripts/eCrypt.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
        data-publicapikey="epk-8C560FBE-4416-4988-88F8-C63FEFCFA210"
        data-amount="1000"
        data-currency="AUD"
      />
    </div>
  );
};

export default CheckoutTest;
