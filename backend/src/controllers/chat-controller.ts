import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI, { ClientOptions } from "openai";

// Controller function to generate a chat completion using OpenAI API
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the message from the request body
  const { message } = req.body;
  try {
    // Find the user based on the ID in the JWT data
    const user = await User.findById(res.locals.jwtData.id);
    // Check if the user exists
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered" });
    // Extract relevant information from the user's existing chats
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as OpenAI.Chat.ChatCompletionMessageParam[];
    // Add the new user message to the chat
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    const config: ClientOptions = configureOpenAI();
    const openai = new OpenAI(config);
    // Get the latest response from OpenAI
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    // Add OpenAI's response to the user's chats
    user.chats.push(chatResponse.choices[0].message);
    // Save the updated user with the new chats
    await user.save();
    // Return the updated chats to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "There is an issue" });
  }
};
// Controller function to send all chats to the authenticated user
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the user exists based on the ID in the JWT data
    const user = await User.findById(res.locals.jwtData.id);
    // Return an error if the user is not found
    if (!user) {
      return res.status(401).send("User not registered");
    }
    // Check if the user ID in the token matches the user ID in the database
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("User does not exist");
    }
     // Return the user's chats to the client
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Controller function to delete all chats for the authenticated user
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the user exists based on the ID in the JWT data
    const user = await User.findById(res.locals.jwtData.id);
    // Return an error if the user is not found
    if (!user) {
      return res.status(401).send("User not registered");
    }
    // Check if the user ID in the token matches the user ID in the database
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("User does not exist");
    }
    // Clear the user's chats array
    //@ts-ignore
    user.chats = [];
    // Save the updated user with empty chats
    await user.save();
     // Return a success message to the client
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};