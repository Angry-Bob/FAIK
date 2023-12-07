import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

// Create a new Express router instance for the main application
const appRouter = Router()

// Mount the userRoutes under the "/user" path
appRouter.use("/user", userRoutes)
// Mount the chatRoutes under the "/chats" path
appRouter.use("/chats", chatRoutes)

export default appRouter