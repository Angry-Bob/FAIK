import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    role: { type: String, required: true, },
    content: { type: String, required: true, },
});
const conversationSchema = new mongoose.Schema({
    conversation: [messageSchema]
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    chats: [conversationSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map