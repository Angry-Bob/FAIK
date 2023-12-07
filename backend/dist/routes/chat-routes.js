import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser, } from "../controllers/chat-controller.js";
// Create a new Express router instance for chat-related routes
const chatRoutes = Router();
// Protected API endpoint: Create a new chat
chatRoutes.post("/new", validate(chatCompletionValidator), // Validate the request using the chatCompletionValidator
verifyToken, // Verify the user's authentication token
generateChatCompletion // Controller function to generate a new chat
);
// Protected API endpoints for user
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map