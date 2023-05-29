import { setCookie } from "@/lib/cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const body = request.body;

    if (body.token) {
      setCookie(response, "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", body.token, {
        path: "/",
        maxAge: 2592000,
        httpOnly: true,
      });
      response.end();
    } else {
      response.end().status(400);
    }
  } else {
    response.end().status(400);
  }
}
