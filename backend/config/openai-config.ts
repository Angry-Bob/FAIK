import { Configuration } from "openai";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_SECRET_API_KEY,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return config;
};