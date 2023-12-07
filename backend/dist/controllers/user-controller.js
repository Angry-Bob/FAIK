import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
// Controller function to get all users
export const getAllUsers = async (req, res, next) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to handle user signup
export const userSignup = async (req, res, next) => {
    try {
        /// Extract user signup information from the request body
        const { name, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        // Hash the user's password before storing it
        const hashedPassword = await hash(password, 10);
        // Create a new user with the provided information
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Create a token and store it in a cookie for authentication
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // Return successful response with user information
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to handle user login
export const userLogin = async (req, res, next) => {
    try {
        // Extract user login information from the request body
        const { email, password } = req.body;
        // Find the user in the database based on the provided email
        const user = await User.findOne({ email });
        // Return an error if the user is not found
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await compare(password, user.password);
        // Return an error if the password is incorrect
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        // Create a token and store it in a cookie for authentication
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // Return successful response with user information
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to verify user authentication status
export const verifyUser = async (req, res, next) => {
    try {
        // Check if the user exists based on the ID in the JWT data
        const user = await User.findById(res.locals.jwtData.id);
        // Return an error if the user is not found
        if (!user) {
            return res.status(401).send("There is an issue");
        }
        // Check if the user ID in the token matches the user ID in the database
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("User not registered");
        }
        // Return successful response with user information
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to handle user logout
export const userLogout = async (req, res, next) => {
    try {
        // Check if the user exists based on the ID in the JWT data
        const user = await User.findById(res.locals.jwtData.id);
        // Return an error if the user is not found
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // Check if the user ID in the token matches the user ID in the database
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("There is an issue");
        }
        // Clear the authentication cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        // Return successful response with user information
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map