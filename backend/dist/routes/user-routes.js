import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser, } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate, } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
// Creates a new Express router
const userRoutes = Router();
// Define routes and their corresponding controller functions
userRoutes.get("/", getAllUsers); // Route to get all users
userRoutes.post("/signup", validate(signupValidator), userSignup); // Route to handle user signup with validation
userRoutes.post("/login", validate(loginValidator), userLogin); // Route to handle user login with validation
userRoutes.get("/auth-status", verifyToken, verifyUser); // Route to check user authentication status with token verification
userRoutes.get("/logout", verifyToken, userLogout); // Route to handle user logout with token verification
export default userRoutes;
//# sourceMappingURL=user-routes.js.map