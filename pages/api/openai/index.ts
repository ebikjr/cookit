import { NextRequest, NextResponse } from "next/server";

import { OpenAIStream } from "@/lib/OpenAiStream";

const systemConfig = `You are an experienced chef that wants to help people easily cook from their homes. You explain recipes with ease and without complicating them much so anyone can cook. You always format your recipes using Markdown so the users can read them easily.`;

const prompt = (
  listedItems: string
) => `I want to cook something with the ingredients in my house but I don't come up with any ideas. Based on the following ingredients and quantities, write a recipe for me to do, it does not necessarily need to include all of the ingredients listed and you can't add ingredients that I haven't listed to you.
Currently, I have:
${listedItems}
What can I make?`;

export default async function handler(req: NextRequest) {
  setResponse("");
  console.log("Getting response from OpenAI...");
  setIsLoading(true);
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });

    if (!token) {
      return new Response("No token was provided", { status: 400 });
    } else {
      const stream = await OpenAIStream(token, {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt(formattedItems),
          },
          {
            role: "system",
            content: systemConfig,
          },
        ],
        temperature: 0.4,
        stream: true,
      });

      return new Response(stream);
    }
  } catch (err: any) {
    console.log({ err });
    return new Response(err, { status: 500 });
  }
}

export const config = {
  runtime: "edge",
};
