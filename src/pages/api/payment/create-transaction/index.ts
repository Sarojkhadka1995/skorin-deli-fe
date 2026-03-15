import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

interface TransactionResponse {
  TransactionId: string;
  Status: string;
  // ... add other expected response fields
}

interface TransactionRequest {
  Payment: {
    TotalAmount: number;
  };
  RedirectUrl: string;
  TransactionType: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { amount, redirectUrl } = req.body;

    if (!amount || !redirectUrl) {
      return res.status(400).json({ error: "Amount and redirectUrl are required" });
    }

    const transaction = await createTransaction(amount, redirectUrl);
    return res.status(200).json(transaction);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res.status(500).json({ error: errorMessage });
  }
}

const createTransaction = async (
  amount: number,
  redirectUrl: string
): Promise<TransactionResponse> => {
  if (
    !process.env.NEXT_PUBLIC_EWAY_API_URL ||
    !process.env.NEXT_PUBLIC_EWAY_API_KEY ||
    !process.env.NEXT_PUBLIC_EWAY_PASSWORD
  ) {
    throw new Error("Missing eWAY API configuration");
  }

  try {
    const transactionData: TransactionRequest = {
      Payment: { TotalAmount: amount * 100 },
      RedirectUrl: redirectUrl,
      TransactionType: "Purchase",
    };

    console.log("inside create transaction =====", transactionData);

    const { data } = await axios.post<TransactionResponse>(
      `${process.env.NEXT_PUBLIC_EWAY_API_URL}/Transaction`,
      transactionData,
      {
        auth: {
          username: process.env.NEXT_PUBLIC_EWAY_API_KEY,
          password: process.env.NEXT_PUBLIC_EWAY_PASSWORD,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("create transaction data =====", data);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Payment transaction failed: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw error;
  }
};
