import mongoose from "mongoose";
import { randomUUID } from "crypto";
// Define the schema for individual chat messages
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(), // Generate a random UUID
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],
});
// Create and export the User model based on the defined schema
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map