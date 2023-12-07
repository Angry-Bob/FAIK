// Importing necessary modules and packages
import express from "express"; // Express.js framework for building web applications
import { config } from "dotenv"; // Load environment variables from a .env file
import morgan from "morgan"; // HTTP request logger middleware for logging requests
import appRouter from "./routes/index.js"; // Custom router for handling routes
import cookieParser from "cookie-parser"; // Parse HTTP request cookies
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)

// Load environment variables from the .env file
config();
// Used to create an Express app
const app = express()

// enables cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Parse incoming JSON
app.use(express.json())
// Parse cookies using secret provided in env file
app.use(cookieParser(process.env.COOKIE_SECRET))
// Log HTTP requests to the console
app.use(morgan('dev'))
// Mount the appRouter to handle routes
app.use("/api/v1", appRouter)

// Exports the Express app
export default app