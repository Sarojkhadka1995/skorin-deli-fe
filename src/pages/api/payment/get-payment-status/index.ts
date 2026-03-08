import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { accessCode } = req.body;

    console.log("accessCode =====", accessCode);

    // const response = await fetch(
    //   `https://api.sandbox.ewaypayments.com/QueryAccessCode/${accessCode}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Basic ${Buffer.from(
    //         `${process.env.NEXT_PUBLIC_EWAY_API_KEY}:${process.env.NEXT_PUBLIC_EWAY_PASSWORD}`
    //       ).toString("base64")}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const response = await fetch(
      `https://api.sandbox.ewaypayments.com/Transaction/${accessCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_EWAY_API_KEY}:${process.env.NEXT_PUBLIC_EWAY_PASSWORD}`
          ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error querying access code:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
