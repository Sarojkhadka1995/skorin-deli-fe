import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const data = req.body;

    // Validate required credentials
    if (
      !process.env.NEXT_PUBLIC_EWAY_API_KEY ||
      !process.env.NEXT_PUBLIC_EWAY_PASSWORD
    ) {
      console.error("Missing eWAY API credentials");
      return res.status(500).json({ error: "Payment service configuration error" });
    }

    const response = await fetch(
      "https://api.sandbox.ewaypayments.com/CreateAccessCodeShared.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_EWAY_API_KEY}:${process.env.NEXT_PUBLIC_EWAY_PASSWORD}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          // Method: "ProcessPayment",
          Method: "ProcessPaymentShared",
          TransactionType: "Purchase",
          RedirectUrl: data.RedirectUrl,
          CancelUrl: data.CancelUrl,
          Payment: data.Payment,
          CustomerReadOnly: data.CustomerReadOnly,
          CustomView: data.CustomView,
          HeaderText: data.HeaderText,
          Language: data.Language,
        }),
      }
    );

    // Enhanced error handling for auth issues
    if (response.status === 401) {
      console.error("eWAY API Authentication failed");
      return res.status(500).json({ error: "Payment service authentication failed" });
    }

    // Check if response is ok
    if (!response.ok) {
      console.error("eWAY API error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return res.status(response.status).json({ error: `eWAY API error: ${response.statusText}` });
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error("Invalid content type:", contentType);
      return res.status(500).json({ error: "Invalid response from eWAY API" });
    }

    const responseData = await response.json();
    console.log("responseData ====", responseData);

    if (responseData) {
      return res.status(200).json({
        AccessCode: responseData.AccessCode,
        FormActionURL: responseData.FormActionURL,
        SharedPaymentUrl: responseData.SharedPaymentUrl,
      });
    } else {
      return res.status(400).json({ error: "Failed to create access code", details: responseData });
    }
  } catch (error) {
    console.error("Error creating access code:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
