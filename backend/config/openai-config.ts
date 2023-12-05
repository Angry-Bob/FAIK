import { OpenAI } from "openai";

export const configureOpenAI = () => {
  const ai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_API_KEY,
    organization: process.env.ORGANIZATION_ID,
  });

  return ai;
};